function convertSecondsToTime(totalSeconds: number) {
  const hours = Math.trunc(totalSeconds / 3600);
  const minutes = Math.trunc((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

const formatTimestampToDateTime = (timestamp: number | undefined): string => {
  if (timestamp === undefined || isNaN(timestamp)) {
    return "----/--/-- --:--:--";
  }

  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "----/--/-- --:--:--";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  } catch {
    return "----/--/-- --:--:--";
  }
};

export { convertSecondsToTime, formatTimestampToDateTime };
