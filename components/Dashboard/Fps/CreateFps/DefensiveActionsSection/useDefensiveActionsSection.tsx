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
  handleChangeInArray,
  handleChangeInArrayObject,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import {
  FpsDefensiveActionsRules,
  fpsProblemValidationRules,
} from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsDefensiveActions, getFps } from "@/redux/fps/fpsThunk";
import { generateFPSId } from "@/utils/generateFPSId";

import {
  initialFpsDefensiveActions,
  categoryData,
  serviceData,
} from "@/data/fps";

import { useRouter, useSearchParams } from "next/navigation";

const useDefensiveActionsSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] = useState<fpsDefensiveActionsType>(
    initialFpsDefensiveActions
  );
  const [fpsId, setFpsQid] = useState<FpsType["fpsId"]>("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let fpsId = params.get("fpsId");

    if (fpsId) {
      setFpsQid(fpsId);
      return;
    }
  }, []);

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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      fpsId: fpsId,
      defensiveActions: JSON.stringify(fpsData),
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
        fpsId: fpsId,
        defensiveActions: JSON.stringify(fpsData),
      },
      (formData) =>
        dispatch(createFpsDefensiveActions({ id: fpsId, fps: formData })),
      handleReset
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsDefensiveActions);
    dispatch(getFps(fpsId));
  };

  return {
    fpsData,
    fpsId,
    categoryData,
    serviceData,
    handleChangeInArray,
    setFpsData,
    addNewDefensiveAction,
    removeDefensiveAction,

    handleSubmit,
    handleReset,
  };
};

export default useDefensiveActionsSection;
