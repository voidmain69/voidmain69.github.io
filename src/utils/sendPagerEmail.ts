import emailjs from '@emailjs/browser';

export interface PagerSender {
  name: string;
  /** Email, phone, Telegram — whatever the visitor left to be reached at. Sent as `email` since
   * that's the variable name EmailJS's own default template wizard uses for its Reply-To field. */
  email: string;
}

/** All three EmailJS IDs are public identifiers (not secrets) — safe to inline into the client
 * bundle. `name`/`email` only reach the recipient if the EmailJS template actually references
 * them (and, for real Reply-To behavior, has its "Reply To" field set to `{{email}}`). */
export async function sendPagerEmail(message: string, from: PagerSender): Promise<boolean> {
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
      {
        message,
        sent_at: new Date().toLocaleString('uk-UA'),
        name: from.name || 'VOID OS visitor',
        email: from.email,
      },
      { publicKey },
    );
    return true;
  } catch {
    return false;
  }
}
