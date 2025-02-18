"use client";
import { FpsType, flexibleFpsType, fpsCauseType } from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  customHandleChange,
  customImagesChange,
  customHandleSubmit,
  customHandleSizeChange,
  customHandleCauseChange,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { verifyFpsValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFps } from "@/redux/fps/fpsThunk";
import { generateQRAPId } from "@/utils/generateFPSId";

import { causeData } from "@/data/fps";

const initialFpsState: fpsCauseType = {
  causeList: [],
  whyList: [""],
};
const useCauseSection = () => {
  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] = useState<fpsCauseType>(initialFpsState);
  const [fpsQid, setFpsQid] = useState<FpsType["qid"]>("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    customHandleChange(e, setFpsData);
  };

  const addNewWhy = () => {
    setFpsData((prevData) => ({
      ...prevData,
      whyList: [...prevData.whyList, ""],
    }));
  };

  const removeWhy = (index: number) => {
    if (fpsData.whyList.length > 1) {
      setFpsData((prevData) => ({
        ...prevData,
        whyList: prevData.whyList.filter((_, i) => i !== index),
      }));
    }
  };

  const handleCauseChange = (data: string, i?: number) => {
    customHandleCauseChange(data, setFpsData, i);
  };

  

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      qid: fpsQid,
      causeList: JSON.stringify(fpsData.causeList),
      whyList: JSON.stringify(fpsData.whyList),
    };
    const newErrors = validateFormFields(
      dataToValidate,
      verifyFpsValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }

    customHandleSubmit(
      e,
      {},
      {
        qid: fpsQid,
        causeList: JSON.stringify(fpsData.causeList),
        whyList: JSON.stringify(fpsData.whyList),
      },
      (formData) => dispatch(createFps(formData)),
      handleReset
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsState);
  };

  return {
    fpsData,
    fpsQid,
    addNewWhy,
    removeWhy,
    handleChange,
    causeData,
    handleCauseChange,
    handleSubmit,
    handleReset,
  };
};

export default useCauseSection;
