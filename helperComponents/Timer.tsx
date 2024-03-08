import { useState, useEffect } from "react";
import { useAppSelector, RootState } from "@/store/store";
const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const user = useAppSelector((state: RootState) => state.userData);
  let intervalId: NodeJS.Timeout | undefined;

  useEffect(() => {
    if (user?.isTimer) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined; // Reset intervalId
      }
      setSeconds(0);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined; // Reset intervalId
      }
    };
  }, [user?.isTimer]);
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
