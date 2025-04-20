import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import VerifyResetCode from "@/components/Auth/Form/VerifyResetCode/VerifyResetCode";
import { useTranslations } from "next-intl";
const VerifyResetCodePage = () => {
  const t = useTranslations("VerifyResetCodePage");
  return (
    <CustomAuthPage title={t("title")}>
      <VerifyResetCode AuthButtonTitle={t("form.submitButton")} />
    </CustomAuthPage>
  );
};

export default VerifyResetCodePage;
