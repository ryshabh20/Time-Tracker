import { useAppSelector } from "@/store/store";
import { useEffect } from "react";

export default function Button({
  handleOnSubmit,
}: {
  handleOnSubmit: () => Promise<void>;
}) {
  const user = useAppSelector((state) => state?.userData);
  useEffect;
  return (
    <button
      type="submit"
      className="bg-custom-green text-white px-5"
      onClick={handleOnSubmit}
      //   disabled={loading}
    >
      {user?.isTimer ? "Stop" : "Start"}
    </button>
  );
}
