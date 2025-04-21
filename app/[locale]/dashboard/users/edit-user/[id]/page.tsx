import EditUser from "@/components/Dashboard/User/EditUser/EditUser";

type PageProps = {
  params: { id: string };
};
//
const Page = ({ params }: PageProps) => {
  return <EditUser id={params.id} />;
};

export default Page;
