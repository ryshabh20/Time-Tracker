import InfoLoader from "@/helperComponents/InfoLoader";
import { useAppSelector } from "@/store/store";
import Image from "next/image";
import { useEffect, useState } from "react";

export const userDetails = () => {
  const user = useAppSelector((state) => state.userData);
  const { name, role, team, avatar } = user ?? {
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
        <div className="flex space-x-2">
          <div className="h-12 w-12 rounded-full">
            <Image
              className="object-fill rounded-full h-full w-full"
              src={user.avatar}
              height={200}
              width={200}
              alt="src"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg float-left">{user.name || "loading"}</span>
            <span className="text-custom-green text-lg">
              {user.team || "loading"}
            </span>
          </div>
        </div>
      ) : (
        <InfoLoader />
      )}
    </div>
  );
};
