import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import SignInForm from "@/components/Auth/Form/SignIn/SignIn";
import { useTranslations } from "next-intl";
const page = () => {
  const t = useTranslations("LoginPage");
  return (
    <CustomAuthPage title={t("title")}>
      <SignInForm AuthButtonTitle={t("form.submitButton")} />
    </CustomAuthPage>
  );
};

export default page;
