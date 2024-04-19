import { useState, useEffect } from "react";
import { useAppSelector, RootState } from "@/store/store";
const Timer = ({ startTime }: { startTime: number }) => {
  const [seconds, setSeconds] = useState<number>(startTime);
  const user = useAppSelector((state: RootState) => state.userData);

  let intervalId: NodeJS.Timeout | undefined;
  useEffect(() => {
    if (user?.isTimer) {
      if (startTime >= 1000) {
        const initialSeconds = Math.round(startTime / 1000);
        setSeconds(initialSeconds);
      } else {
        setSeconds(0);
      }
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
      setSeconds(0);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    };
  }, [user?.isTimer, user?.currentTask?.description, startTime]);
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  return (
    <div className="flex items-center text-xl">
      {hours < 10 ? "0" + hours : hours}:
      {minutes < 10 ? "0" + minutes : minutes}:
      {remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}
    </div>
  );
};

export default Timer;
