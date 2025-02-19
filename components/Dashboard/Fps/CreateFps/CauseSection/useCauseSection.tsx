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
  handleChangeInArray,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { fpsCauseValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsCause } from "@/redux/fps/fpsThunk";
import { generateFPSId } from "@/utils/generateFPSId";

import { initialFpsCause, causeData } from "@/data/fps";

import { useRouter, useSearchParams } from "next/navigation";

const useCauseSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] = useState<fpsCauseType>(initialFpsCause);
  const [fpsQid, setFpsQid] = useState<FpsType["fpsId"]>("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let fpsId = params.get("fpsId");

    if (fpsId) {
      setFpsQid(fpsId);
      return;
    }
  }, []);

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

  const handleChangeWhyList = (data: string, i?: number) => {
    setFpsData((prevData) => ({
      ...prevData,
      whyList: prevData.whyList.map((item, index) =>
        index === i ? data : item
      ),
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      qid: fpsQid,
      causeList: JSON.stringify(fpsData.causeList),
      whyList: JSON.stringify(fpsData.whyList),
    };
    const newErrors = validateFormFields(
      dataToValidate,
      fpsCauseValidationRules
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
      (formData) => dispatch(createFpsCause({ id: fpsQid, fps: formData })),
      handleReset
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsCause);
  };

  return {
    fpsData,
    fpsQid,
    addNewWhy,
    removeWhy,
    causeData,
    handleCauseChange,
    handleChangeWhyList,
    handleSubmit,
    handleReset,
  };
};

export default useCauseSection;
