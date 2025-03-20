import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import ResetPassword from "@/components/Auth/Form/ResetPassword/ResetPassword";
import { useTranslations } from "next-intl";
const page = () => {
  const t = useTranslations("ResetPasswordPage");
  return (
    <CustomAuthPage title={t("title")}>
      <ResetPassword AuthButtonTitle={t("form.submitButton")} />
    </CustomAuthPage>
  );
};

export default page;
