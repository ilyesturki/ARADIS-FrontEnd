"use client";
import {
  QrapType,
  fpsDefensiveActionsType,
  fpsDefensiveActionType,
} from "@/redux/qrap/qrapSlice";
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
  verifyQrapValidationRules,
} from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createQrap } from "@/redux/qrap/qrapThunk";
import { generateQRAPId } from "@/utils/generateQRAPId";

import { categoryData, serviceData } from "@/data/fps";

const initialQrapState: fpsDefensiveActionsType = [
  {
    procedure: "",
    userCategory: "",
    userService: "",
    quand: "",
  },
];
const useQrap4 = () => {
  const dispatch = useAppDispatch();
  const [qrapData, setQrapData] =
    useState<fpsDefensiveActionsType>(initialQrapState);
  const [qrapQid, setQrapQid] = useState<QrapType["qid"]>("");

  const addNewDefensiveAction = () => {
    setQrapData((prevData) => [
      ...prevData,
      { procedure: "", userCategory: "", userService: "", quand: "" },
    ]);
  };

  const removeDefensiveAction = (index: number) => {
    if (qrapData.length > 1) {
      setQrapData((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    customHandleChange(e, setQrapData);
  };

  useEffect(() => {
    const qid = generateQRAPId("QRAP", 8);
    setQrapQid(qid);
  }, []);

  const handleCategoryChange = (
    userCategory: fpsDefensiveActionType["userCategory"],
    i: number
  ) => {
    handleChangeSelectInArray(setQrapData, userCategory, "userCategory", i);
  };

  const handleServiceChange = (
    userService: fpsDefensiveActionType["userService"],
    i: number
  ) => {
    handleChangeSelectInArray(setQrapData, userService, "userService", i);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      qid: qrapQid,
      qrapData: JSON.stringify(qrapData),
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
        qid: qrapQid,
        qrapData: JSON.stringify(qrapData),
      },
      (formData) => dispatch(createQrap(formData)),
      handleReset
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setQrapData(initialQrapState);
  };

  return {
    qrapData,
    qrapQid,
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

export default useQrap4;
