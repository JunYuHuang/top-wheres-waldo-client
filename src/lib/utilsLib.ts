import { Duration } from "luxon";

function formatDuration(timeInMS: number) {
  const duration = Duration.fromMillis(timeInMS);
  return duration.toFormat("hh:mm:ss.SSS");
}

export {
  formatDuration
}
