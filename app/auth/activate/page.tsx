import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import ActivateForm from "@/components/Auth/Form/Activate/Activate";

const page = () => {
  return (
    <CustomAuthPage
      title="Activate Account"
    >
      <ActivateForm AuthButtonTitle="Activate" />
    </CustomAuthPage>
  );
};

export default page;
