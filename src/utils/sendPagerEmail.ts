import emailjs from '@emailjs/browser';

/** All three values are EmailJS public identifiers (not secrets) — safe to inline into the client bundle. */
export async function sendPagerEmail(message: string): Promise<boolean> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return false;
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      { message, sent_at: new Date().toLocaleString('uk-UA') },
      { publicKey },
    );
    return true;
  } catch {
    return false;
  }
}
