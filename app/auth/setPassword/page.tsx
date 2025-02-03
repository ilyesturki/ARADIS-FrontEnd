import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import SetPasswordForm from "@/components/Auth/Form/SetPassword/SetPassword";

const page = () => {
  return (
    <CustomAuthPage title="SetPassword" subTitle="Welcome!">
      <SetPasswordForm AuthButtonTitle="SetPassword" />
    </CustomAuthPage>
  );
};

export default page;
