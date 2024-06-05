export function shortenText(text: string, limitToShow: number) {
  if (text.length <= limitToShow) return text;
  return `${text.slice(0, limitToShow)}...`;
}
