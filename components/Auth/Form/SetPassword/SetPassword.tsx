"use client";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import AuthButton from "../../subcomponents/AuthButton";
import useSetPassword from "./useSetPassword";

const SetPassword = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const { setPasswordData, handleChange, handleSubmit, loading } =
    useSetPassword();
  return (
    <>
      <div className=" grid gap-4 py-3 pb-5 w-72">
        <CustomInput
          label="Password"
          placeholder="Password"
          value={setPasswordData.password}
          onChange={handleChange}
          name="password"
        />
      </div>

      <AuthButton
        title={AuthButtonTitle}
        onClick={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default SetPassword;
