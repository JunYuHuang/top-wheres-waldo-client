/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from "react";

const DEFAULT_ARGS = {
  startTimeInMS: Date.now(),
  updateIntervalInMS: 1
}

export default function useStopwatch(args = DEFAULT_ARGS) {
  const { startTimeInMS, updateIntervalInMS } = args;
  const isRunningRef = useRef<boolean>(false);
  const startTimeRef = useRef<number>(startTimeInMS);
  const [elapsedTimeInMS, setElapsedTimeInMS] = useState<number>(0);
  const intervalIdRef = useRef<number>(0);

  function start() {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    const intervalId = setInterval(() => {
      setElapsedTimeInMS(Date.now() - startTimeRef.current)
    }, updateIntervalInMS);
    intervalIdRef.current = intervalId;
  }

  function stop() {
    if (!isRunningRef.current) return;

    isRunningRef.current = false;
    clearInterval(intervalIdRef.current);
  }

  function reset(startTimeInMS = Date.now()) {
    startTimeRef.current = startTimeInMS;
    isRunningRef.current = false;
    clearInterval(intervalIdRef.current);
    setElapsedTimeInMS(0);
  }

  return {
    start,
    stop,
    reset,
    elapsedTimeInMS,
  }
}
