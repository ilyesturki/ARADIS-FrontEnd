import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import SetPasswordForm from "@/components/Auth/Form/SetPassword/SetPassword";

const page = () => {
  return (
    <CustomAuthPage
      title="Set Password"
      subTitle="Please enter your new password"
    >
      <SetPasswordForm AuthButtonTitle="Set Password" />
    </CustomAuthPage>
  );
};

export default page;
