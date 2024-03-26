import InfoLoader from "@/helperComponents/InfoLoader";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";

export const userDetails = () => {
  const user = useAppSelector((state) => state.userData);
  const { name, role, team } = user ?? {
    name: "Default Name",
    role: "Default Role",
    team: "Default Team",
  };
  const [hydrated, setHydtared] = useState(false);

  useEffect(() => {
    setHydtared(true);
  }, []);

  if (!hydrated) return null;
  return (
    <div>
      {user ? (
        <div className="flex flex-col">
          <span className="text-lg float-left">{user.name || "loading"}</span>
          <span className="text-custom-green text-lg">
            {user.team || "loading"}
          </span>
        </div>
      ) : (
        <InfoLoader />
      )}
    </div>
  );
};
