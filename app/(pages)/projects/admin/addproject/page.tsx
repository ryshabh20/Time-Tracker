"use client";
import AdminRoute from "@/helperComponents/AdminRoute";
import FormProject from "@/helperComponents/formProject";

const Addproject = () => {
  return <FormProject edit={false} />;
};

export default AdminRoute(Addproject);
