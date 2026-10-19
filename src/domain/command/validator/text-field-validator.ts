export function isTextInput(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLInputElement &&
      ["text", "search", "email", "url", "tel"].includes(target.type)) ||
    target.isContentEditable
  );
}
