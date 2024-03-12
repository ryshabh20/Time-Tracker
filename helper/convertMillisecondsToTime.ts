export function convertMillisecondsToTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export function convertHoursToTime(hours: number) {
  const totalSeconds = Math.floor(hours * 3600);
  const hoursComponent = Math.floor(totalSeconds / 3600);
  const minutesComponent = Math.floor((totalSeconds % 3600) / 60);
  const secondsComponent = totalSeconds % 60;

  const paddedHours = String(hoursComponent).padStart(2, "0");
  const paddedMinutes = String(minutesComponent).padStart(2, "0");
  const paddedSeconds = String(secondsComponent).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}
