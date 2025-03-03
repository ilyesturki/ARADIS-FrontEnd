"use client";
import { FpsType, flexibleFpsType } from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { customHandleSubmit, handleChangeInArray } from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { fpsValidationValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsValidation, getFps } from "@/redux/fps/fpsThunk";

import { initialFpsValidation } from "@/data/fps";

import { useSearchParams } from "next/navigation";

const useValidationSection = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] = useState<flexibleFpsType>(initialFpsValidation);
  const [fpsId, setFpsId] = useState<FpsType["fpsId"]>("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let fpsId = params.get("fpsId");

    if (fpsId) {
      setFpsId(fpsId);
      return;
    }
  }, []);

  const [submitBtnValue, setSubmitBtnValue] = useState<"Save" | "Update">(
    "Save"
  );

  const [fpsCompleted, setFpsCompleted] = useState<boolean>(false);

  const fps = useAppSelector((state) => state.fpss.fps);

  useEffect(() => {
    if (fps && Object.keys(fps).length > 0) {
      console.log("fps?.validation");
      console.log(fps);
      console.log("fps?.validation");
      setFpsData({
        status: fps.status,
      });
      // setSubmitBtnValue(
      //   ["defensiveActions"].includes(fps.currentStep) ? "Update" : "Save"
      // );
    }
  }, [fps]);

  const handleStatusChange = () => {
    setFpsData((prevData) => ({
      ...prevData,
      status: fpsCompleted ? "completed" : "failed",
    }));
    setFpsCompleted(!fpsCompleted);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      fpsId: fpsId,
      status: fpsData.status || "",
    };
    const newErrors = validateFormFields(
      dataToValidate,
      fpsValidationValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }

    customHandleSubmit(
      e,
      {},
      {
        fpsId: fpsId,
        status: fpsData.status || "",
      },
      (formData) => dispatch(createFpsValidation({ id: fpsId, fps: formData }))
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsValidation);
  };

  return {
    fpsData,
    setFpsData,
    fpsId,
    fpsCompleted,
    handleStatusChange,
    handleSubmit,
    handleReset,
    submitBtnValue,
  };
};

export default useValidationSection;
