import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import SignInForm from "@/components/Auth/Form/SignIn/SignIn";

const page = () => {
  return (
    <CustomAuthPage
      title="Login Account"
      >
      <SignInForm AuthButtonTitle="Log In" />
    </CustomAuthPage>
  );
};

export default page;
