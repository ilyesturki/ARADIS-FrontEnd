"use client";
import AuthButton from "../../subcomponents/AuthButton";
import useForgetPassword from "./useForgetPassword";
import { FaUser } from "react-icons/fa";
import CustomAuthInput from "@/components/Common/CustomInput/CustomAuthInput";
import { useTranslations } from "next-intl";
const ForgetPassword = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const t = useTranslations("ForgetPasswordPage.form");
  const { email, handleChange, handleSubmit, loading } = useForgetPassword();
  return (
    <>
      <CustomAuthInput
        name="username"
        label={t("usernameLabel")}
        value={email}
        onChange={handleChange}
        icon={<FaUser />}
      />

      <AuthButton
        title={AuthButtonTitle}
        onClick={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default ForgetPassword;
