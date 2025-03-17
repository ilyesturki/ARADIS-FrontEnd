"use client";
import AuthButton from "../../subcomponents/AuthButton";
import useForgetPassword from "./useForgetPassword";
import { FaUser } from "react-icons/fa";
import CustomAuthInput from "@/components/Common/CustomInput/CustomAuthInput";

const ForgetPassword = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const { email, handleChange, handleSubmit, loading } = useForgetPassword();
  return (
    <>
      <CustomAuthInput
        name="username"
        label="Username"
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
