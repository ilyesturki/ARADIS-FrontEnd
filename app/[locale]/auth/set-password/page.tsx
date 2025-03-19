import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import SetPasswordForm from "@/components/Auth/Form/SetPassword/SetPassword";

const page = () => {
  return (
    <CustomAuthPage
      title="Set Password"
    >
      <SetPasswordForm AuthButtonTitle="Set Password" />
    </CustomAuthPage>
  );
};

export default page;
