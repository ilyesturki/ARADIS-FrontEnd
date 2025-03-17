"use client";
import AuthButton from "../../subcomponents/AuthButton";
import useVerifyResetCode from "./useVerifyResetCode";
import CustomInputOTP from "@/components/Common/CustomInput/CustomInputOTP";

const VerifyResetCode = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const { resetCode, handleChange, handleSubmit, loading } =
    useVerifyResetCode();
  return (
    <>
      <CustomInputOTP value={resetCode} onChange={handleChange} />

      <AuthButton
        title={AuthButtonTitle}
        onClick={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default VerifyResetCode;
