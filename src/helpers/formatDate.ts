export function formatTimeString(time: string): string {
  const parts = time.split(':').map(Number);
  
  // Ensure the array has exactly three parts (hours, minutes, seconds)
  while (parts.length < 3) {
      parts.unshift(0);
  }

  const [hours, minutes, seconds] = parts;

  // Format each part to ensure two digits
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}