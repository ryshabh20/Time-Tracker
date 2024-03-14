import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";

export const userDetails = () => {
  const [hydrated, setHydtared] = useState(false);
  const user = useAppSelector((state) => state.userData);
  useEffect(() => {
    setHydtared(true);
  }, []);

  if (!hydrated) return null;
  return (
    <div className="flex flex-col">
      <span className="text-lg float-left">{user?.name || "loading"}</span>
      <span className="text-custom-green text-lg">
        {user?.team || "loading"}
      </span>
    </div>
  );
};
