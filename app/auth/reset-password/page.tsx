import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import ResetPassword from "@/components/Auth/Form/ResetPassword/ResetPassword";

const page = () => {
  return (
    <CustomAuthPage
      title="Change password"
    >
      <ResetPassword AuthButtonTitle="Change" />
    </CustomAuthPage>
  );
};

export default page;