import { beforeEach, describe, expect, it, vi } from 'vitest';

const sendMock = vi.fn();
vi.mock('@emailjs/browser', () => ({
  default: { send: (...args: unknown[]) => sendMock(...args) },
}));

const { sendPagerEmail } = await import('./sendPagerEmail');

describe('sendPagerEmail', () => {
  beforeEach(() => {
    sendMock.mockReset();
    vi.unstubAllEnvs();
  });

  it('skips sending and returns false when EmailJS is not configured', async () => {
    expect(await sendPagerEmail('hi')).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('sends via emailjs.send with the configured IDs and returns true on success', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_1');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_1');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_1');
    sendMock.mockResolvedValue({ status: 200, text: 'OK' });

    expect(await sendPagerEmail('hello there')).toBe(true);
    expect(sendMock).toHaveBeenCalledWith(
      'service_1',
      'template_1',
      expect.objectContaining({ message: 'hello there' }),
      { publicKey: 'public_1' },
    );
  });

  it('returns false instead of throwing when emailjs.send rejects', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_1');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_1');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_1');
    sendMock.mockRejectedValue(new Error('network down'));

    expect(await sendPagerEmail('hello there')).toBe(false);
  });
});
