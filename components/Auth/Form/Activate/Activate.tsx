"use client";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import AuthButton from "../../subcomponents/AuthButton";
import useActivate from "./useActivate";

const Activate = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const { activateData, handleChange, handleSubmit, loading } = useActivate();
  return (
    <>
      <div className=" grid gap-4 py-3 pb-5 w-72">
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
