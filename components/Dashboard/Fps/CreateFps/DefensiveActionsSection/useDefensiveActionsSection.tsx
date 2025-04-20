"use client";
import { FpsType, editedDefensiveActionType } from "@/redux/fps/fpsSlice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { customHandleSubmit } from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { FpsDefensiveActionsRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsDefensiveActions } from "@/redux/fps/fpsThunk";

import { initialFpsDefensiveActions } from "@/data/fps";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const useDefensiveActionsSection = () => {
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] = useState<editedDefensiveActionType[]>(
    initialFpsDefensiveActions
  );
  const [fpsId, setFpsId] = useState<FpsType["fpsId"]>("");

  const [submitBtnValue, setSubmitBtnValue] = useState<"Save" | "Update">(
    "Save"
  );

  const { data: session } = useSession({ required: true });

  const isAdminOrManager = useMemo(
    () => ["admin", "manager"].includes(session?.user.role ?? ""),
    [session?.user.role]
  );
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  const isDone = useMemo(() => {
    return currentStep === "validation";
  }, [currentStep]);

  const disabled = useMemo(() => {
    const tabsOrder = [
      "problem",
      "immediateActions",
      "cause",
      "defensiveActions",
      "validation",
    ];

    return currentStep
      ? isAdminOrManager ||
          isDone ||
          !(tabsOrder.indexOf(currentStep) >= tabsOrder.indexOf("cause"))
      : isAdminOrManager;
  }, [isAdminOrManager, currentStep]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const fpsId = params.get("fpsId");

    if (fpsId) {
      setFpsId(fpsId);
      return;
    }
  }, []);

  const fps = useAppSelector((state) => state.fpss.fps);

  useEffect(() => {
    if (
      fps?.defensiveActions &&
      Object.keys(fps?.defensiveActions).length > 0
    ) {
      console.log("fps?.defensiveActions");
      console.log(fps?.defensiveActions);
      console.log("fps?.defensiveActions");
      setFpsData(fps?.defensiveActions);
    }
    setCurrentStep(fps?.currentStep || null);
    setSubmitBtnValue(
      ["defensiveActions", "validation"].includes(fps?.currentStep || "")
        ? "Update"
        : "Save"
    );
  }, [fps]);

  const editDefensiveAction = (index: number) => {
    const newFpsData = fpsData
      .map((e) => (e.edit ? { ...e, edit: false } : e))
      .map((e, i) => {
        return i === index ? { ...e, edit: true } : e;
      });

    setFpsData(newFpsData);
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
        dispatch(createFpsDefensiveActions({ id: fpsId, fps: formData }))
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsDefensiveActions);
  };

  return {
    disabled,
    setFpsData,
    fpsData,
    editDefensiveAction,
    removeDefensiveAction,
    handleSubmit,
    handleReset,
    submitBtnValue,
    isAdminOrManager,
    isDone,
    fpsId,
  };
};

export default useDefensiveActionsSection;
