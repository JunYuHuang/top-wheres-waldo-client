/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatDuration } from "../lib/utilsLib";

interface StopwatchProps {
  shownElapsedTimeInMS: number;
  start: any;
  stop: any;
  reset: any;
  isDebugMode: boolean;
}

export default function Stopwatch({
  shownElapsedTimeInMS,
  start,
  stop,
  reset,
  isDebugMode,
}: StopwatchProps) {
  if (isDebugMode) {
    return (
      <div className="mb-4">
        <div className="text-2xl">
          Time: {formatDuration(shownElapsedTimeInMS)}
        </div>
        <div className="mb-4">
          <p className="text-xl mb-2">Stopwatch controls:</p>
          <div className="flex flex-row items-center gap-x-1">
            <button
              onClick={start}
              className="bg-gray-200 rounded-2xl py-0.5 px-4 text-xl"
            >
              Start
            </button>
            <button
              onClick={stop}
              className="bg-gray-200 rounded-2xl py-0.5 px-4 text-xl"
            >
              Stop
            </button>
            <button
              onClick={() => reset()}
              className="bg-gray-200 rounded-2xl py-0.5 px-4 text-xl"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-2xl mb-4">
      Time: {formatDuration(shownElapsedTimeInMS)}
    </div>
  );
}
