"use client";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminRoute = (Component: any) => {
  return (props: any) => {
    const user = useAppSelector((state) => state?.userData);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    useEffect(() => {
      const isAdminAv = user?.role === "admin";

      setIsAdmin(isAdminAv);
      if (!isAdminAv) {
        router.push(`/`);
      }
    }, [router, user]);
    return isAdmin ? <Component {...props} /> : <></>;
  };
};

export default AdminRoute;
