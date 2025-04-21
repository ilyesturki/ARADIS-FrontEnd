import EditUser from "@/components/Dashboard/User/EditUser/EditUser";

const Page = ({ params }: { params: { id: string } }) => {
  return <EditUser id={params.id} />;
};

export default Page;
