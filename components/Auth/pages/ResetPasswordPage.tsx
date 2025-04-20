import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import ResetPassword from "@/components/Auth/Form/ResetPassword/ResetPassword";
import { useTranslations } from "next-intl";
const ResetPasswordPage = () => {
  const t = useTranslations("ResetPasswordPage");
  return (
    <CustomAuthPage title={t("title")}>
      <ResetPassword AuthButtonTitle={t("form.submitButton")} />
    </CustomAuthPage>
  );
};

export default ResetPasswordPage;
