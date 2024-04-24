"use client";
import AdminRoute from "@/helperComponents/AdminRoute";
import FormProject from "@/helperComponents/formProject";

const Editproject = ({ params }: { params: { id: string } }) => {
  return <FormProject edit={true} id={params.id} />;
};

export default Editproject;
