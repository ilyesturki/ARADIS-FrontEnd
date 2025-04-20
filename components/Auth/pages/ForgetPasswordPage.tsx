import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import ForgetPassword from "@/components/Auth/Form/ForgetPassword/ForgetPassword";
import { useTranslations } from "next-intl";
const ForgetPasswordPage = () => {
  const t = useTranslations("ForgetPasswordPage");
  return (
    <CustomAuthPage title={t("title")}>
      <ForgetPassword AuthButtonTitle={t("form.submitButton")} />
    </CustomAuthPage>
  );
};

export default ForgetPasswordPage;
