import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import SetPasswordForm from "@/components/Auth/Form/SetPassword/SetPassword";
import { useTranslations } from "next-intl";
const SetPasswordPage = () => {
  const t = useTranslations("SetPasswordPage");
  return (
    <CustomAuthPage title={t("title")}>
      <SetPasswordForm AuthButtonTitle={t("form.submitButton")} />
    </CustomAuthPage>
  );
};

export default SetPasswordPage;
