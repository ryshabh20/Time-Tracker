import FormProject from "@/helperComponents/formProject";

const Tryproject = ({ params }: { params: { id: string } }) => {
  return <FormProject edit={true} id={params.id} />;
};

export default Tryproject;
