import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import VerifyResetCode from "@/components/Auth/Form/VerifyResetCode/VerifyResetCode";

const page = () => {
  return (
    <CustomAuthPage
      title="Check verification code"
    >
      <VerifyResetCode AuthButtonTitle="Check Code" />
    </CustomAuthPage>
  );
};

export default page;