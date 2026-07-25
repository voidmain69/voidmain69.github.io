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
    // Explicitly blank rather than relying on ambient absence — a local .env.local with real
    // EmailJS credentials (for manual testing) would otherwise leak into this "unconfigured" case.
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', '');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', '');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', '');
  });

  const sender = { name: 'Alex', email: 'alex@example.com' };

  it('skips sending and returns false when EmailJS is not configured', async () => {
    expect(await sendPagerEmail('hi', sender)).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('sends via emailjs.send with the configured IDs, message, and sender contact info', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_1');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_1');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_1');
    sendMock.mockResolvedValue({ status: 200, text: 'OK' });

    expect(await sendPagerEmail('hello there', sender)).toBe(true);
    expect(sendMock).toHaveBeenCalledWith(
      'service_1',
      'template_1',
      expect.objectContaining({ message: 'hello there', name: 'Alex', email: 'alex@example.com' }),
      { publicKey: 'public_1' },
    );
  });

  it('falls back to a generic name when the visitor left it blank', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_1');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_1');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_1');
    sendMock.mockResolvedValue({ status: 200, text: 'OK' });

    await sendPagerEmail('hello there', { name: '', email: 'alex@example.com' });
    expect(sendMock).toHaveBeenCalledWith(
      'service_1',
      'template_1',
      expect.objectContaining({ name: 'VOID OS visitor' }),
      { publicKey: 'public_1' },
    );
  });

  it('returns false instead of throwing when emailjs.send rejects', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_1');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_1');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_1');
    sendMock.mockRejectedValue(new Error('network down'));

    expect(await sendPagerEmail('hello there', sender)).toBe(false);
  });
});
