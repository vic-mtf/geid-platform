export default function formatDuration(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const difference = now.getTime() - date.getTime();
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
    const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(difference / (1000 * 60)) % 60;
    const seconds = Math.floor(difference / 1000) % 60;
    let duration = "";
    if (years !== 0) 
      duration += `${years}A `;
    if (months !== 0)
      duration += `${months}M `;
    if (weeks !== 0) 
      duration += `${weeks}S `;
    if (days !== 0)
      duration += `${days}j `;
    if (hours !== 0) 
      duration += `${hours.toString().padStart(2, '0')}:`;
      return `${duration}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
  