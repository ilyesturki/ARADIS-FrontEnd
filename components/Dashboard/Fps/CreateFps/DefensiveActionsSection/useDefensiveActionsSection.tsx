"use client";
import {
  FpsType,
  fpsDefensiveActionsType,
  fpsDefensiveActionType,
} from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  customHandleChange,
  customHandleSubmit,
  handleChangeSelectInArray,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import {
  FpsDefensiveActionsRules,
  verifyFpsValidationRules,
} from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFps } from "@/redux/fps/fpsThunk";
import { generateQRAPId } from "@/utils/generateQRAPId";

import { categoryData, serviceData } from "@/data/fps";

const initialFpsState: fpsDefensiveActionsType = [
  {
    procedure: "",
    userCategory: "",
    userService: "",
    quand: "",
  },
];
const useDefensiveActionsSection = () => {
  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] =
    useState<fpsDefensiveActionsType>(initialFpsState);
  const [fpsQid, setFpsQid] = useState<FpsType["qid"]>("");

  const addNewDefensiveAction = () => {
    setFpsData((prevData) => [
      ...prevData,
      { procedure: "", userCategory: "", userService: "", quand: "" },
    ]);
  };

  const removeDefensiveAction = (index: number) => {
    if (fpsData.length > 1) {
      setFpsData((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    customHandleChange(e, setFpsData);
  };

  useEffect(() => {
    const qid = generateQRAPId("QRAP", 8);
    setFpsQid(qid);
  }, []);

  const handleCategoryChange = (
    userCategory: fpsDefensiveActionType["userCategory"],
    i: number
  ) => {
    handleChangeSelectInArray(setFpsData, userCategory, "userCategory", i);
  };

  const handleServiceChange = (
    userService: fpsDefensiveActionType["userService"],
    i: number
  ) => {
    handleChangeSelectInArray(setFpsData, userService, "userService", i);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      qid: fpsQid,
      fpsData: JSON.stringify(fpsData),
    };
    const newErrors = validateFormFields(
      dataToValidate,
      FpsDefensiveActionsRules
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
        fpsData: JSON.stringify(fpsData),
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
    handleChange,
    categoryData,
    serviceData,
    handleCategoryChange,
    handleServiceChange,
    addNewDefensiveAction,
    removeDefensiveAction,

    handleSubmit,
    handleReset,
  };
};

export default useDefensiveActionsSection;
