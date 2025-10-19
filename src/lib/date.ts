export function formatDate(value: string): string {
  if (!value) {
    return "";
  }

  const match = value.match(/^\d{4}-\d{2}-\d{2}/);
  if (match) {
    return match[0];
  }

  const normalized = value.replace(" ", "T");
  const date = new Date(normalized);
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString().slice(0, 10);
  }

  return value;
}
