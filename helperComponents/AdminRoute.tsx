import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminRoute = (Component: any, page: string) => {
  return (props: any) => {
    const user = useAppSelector((state) => state.userData);
    const isAdmin = user?.role === "admin";
    const router = useRouter();

    useEffect(() => {
      if (!isAdmin) {
        router.push(`/${page}`);
      }
    }, [isAdmin, router]);
    return isAdmin ? <Component {...props} /> : <></>;
  };
};

export default AdminRoute;
