"use client";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import AuthButton from "../../subcomponents/AuthButton";
import useSetPassword from "./useSetPassword";
import { FaLock } from "react-icons/fa";
import CustomAuthInput from "@/components/Common/CustomInput/CustomAuthInput";
import { useTranslations } from "next-intl";
const SetPassword = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const t = useTranslations("SetPasswordPage.form");
  const { setPasswordData, handleChange, handleSubmit, loading } =
    useSetPassword();
  return (
    <>
      <CustomAuthInput
        name="password"
        label={t("passwordLabel")}
        type="password"
        value={setPasswordData.password}
        onChange={handleChange}
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

export default SetPassword;
