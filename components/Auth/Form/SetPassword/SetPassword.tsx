"use client";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import { faCircleCheck as regularCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthButton from "../../subcomponents/AuthButton";
import Link from "next/link";
import useSetPassword from "./useSetPassword";

const SetPassword = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const { setPasswordData, handleChange, handleSubmit, loading } =
    useSetPassword();
  return (
    <>
      <div className=" grid gap-4 py-4">
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
