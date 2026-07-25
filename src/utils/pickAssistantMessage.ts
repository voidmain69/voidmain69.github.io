/** Alternates between the ordered "tour" slides and a randomly picked fun fact, so a visitor who
 * lets the assistant nag them for a while eventually sees the whole tour while it still feels
 * spontaneous rather than a fixed script. `index` is the assistant's 0-based appearance count. */
export function pickAssistantMessage(index: number, slides: string[], funFacts: string[]): string {
  const isFactTurn = index % 2 === 1 && funFacts.length > 0;
  if (isFactTurn) {
    return funFacts[Math.floor(Math.random() * funFacts.length)] ?? funFacts[0] ?? '';
  }
  const slideIndex = Math.floor(index / 2) % slides.length;
  return slides[slideIndex] ?? slides[0] ?? '';
}
