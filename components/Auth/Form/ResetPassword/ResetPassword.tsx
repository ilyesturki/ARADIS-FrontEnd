"use client";
import AuthButton from "../../subcomponents/AuthButton";
import useResetPassword from "./useResetPassword";
import { FaLock } from "react-icons/fa";
import CustomAuthInput from "@/components/Common/CustomInput/CustomAuthInput";
import { useTranslations } from "next-intl";
const ResetPassword = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const t = useTranslations("ResetPasswordPage.form");
  const { resetPasswordData, handleChange, handleSubmit, loading } =
    useResetPassword();
  return (
    <>
      <CustomAuthInput
        name="password"
        label={t("passwordLabel")}
        type="password"
        value={resetPasswordData.password}
        onChange={handleChange}
        icon={<FaLock />}
      />
      <CustomAuthInput
        name="passwordConfirm"
        label={t("confirmPasswordLabel")}
        type="password"
        value={resetPasswordData.passwordConfirm}
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

export default ResetPassword;
