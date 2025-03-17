"use client";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import AuthButton from "../../subcomponents/AuthButton";
import useActivate from "./useActivate";
import { FaLock } from "react-icons/fa";
import CustomAuthInput from "@/components/Common/CustomInput/CustomAuthInput";

const Activate = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const { activateData, handleChange, handleSubmit, loading } = useActivate();
  return (
    <>
      <CustomAuthInput
        label="Matricule"
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
