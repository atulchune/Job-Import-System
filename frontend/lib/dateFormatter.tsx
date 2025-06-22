export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);

  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', // your local timezone (change if needed)
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
