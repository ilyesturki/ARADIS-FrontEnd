"use client";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import { faCircleCheck as regularCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthButton from "../../subcomponents/AuthButton";
import Link from "next/link";
import useActivate from "./useActivate";

const Activate = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const {
    activateData,
    handleChange,
    handleSubmit,
    loading,
  } = useActivate();
  return (
    <>
      <div className=" grid gap-4 py-4">
        

        <CustomInput
          label="Matricule"
          placeholder="Matricule"
          value={activateData.mat}
          onChange={handleChange}
          name="mat"
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

export default Activate;
