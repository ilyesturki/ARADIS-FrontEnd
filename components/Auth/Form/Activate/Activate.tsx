"use client";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import AuthButton from "../../subcomponents/AuthButton";
import useActivate from "./useActivate";
import { FaLock } from "react-icons/fa";
import CustomAuthInput from "@/components/Common/CustomInput/CustomAuthInput";
import { useTranslations } from "next-intl";
const Activate = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const t = useTranslations("ActivatePage.form");
  const { activateData, handleChange, handleSubmit, loading } = useActivate();
  return (
    <>
      <CustomAuthInput
        label={t("employeeNumberLabel")}
        value={activateData.mat}
        onChange={handleChange}
        name="mat"
        icon={<FaLock />}
        className="mt-6"
      />

      <AuthButton
        title={AuthButtonTitle}
        onClick={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default Activate;
