import EditUser from "@/components/Dashboard/User/EditUser/EditUser";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <EditUser id={id} />;
};

export default Page;
