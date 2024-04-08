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

export function formatDate(dateString: string) {
  const dateObj = new Date(dateString.split("/").reverse().join("-"));
  const todayDate = new Date().toLocaleDateString();
  if (todayDate === dateObj.toLocaleDateString()) {
    return "Today";
  }
  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  if (yesterday.toLocaleDateString() === dateObj.toLocaleDateString()) {
    return "Yesterday";
  }
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
}
export function millisecondsToTime(ms: number) {
  const seconds = Math.floor(ms / 1000);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
