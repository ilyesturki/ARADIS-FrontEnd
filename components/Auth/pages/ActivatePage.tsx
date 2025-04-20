import CustomAuthPage from "@/components/Auth/CustomAuthPage";
import ActivateForm from "@/components/Auth/Form/Activate/Activate";
import { useTranslations } from "next-intl";
const ActivatePage = () => {
  const t = useTranslations("ActivatePage");
  return (
    <CustomAuthPage title={t("title")}>
      <ActivateForm AuthButtonTitle={t("form.submitButton")} />
    </CustomAuthPage>
  );
};

export default ActivatePage;
