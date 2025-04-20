"use client";
import { FpsType, fpsCauseType } from "@/redux/fps/fpsSlice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customHandleSubmit,
  customHandleCauseChange,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { fpsCauseValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsCause } from "@/redux/fps/fpsThunk";

import { initialFpsCause, causeData } from "@/data/fps";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const useCauseSection = () => {
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] = useState<fpsCauseType>(initialFpsCause);
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

  const { data: session } = useSession({ required: true });

  const isAdminOrManager = useMemo(
    () => ["admin", "manager"].includes(session?.user.role ?? ""),
    [session?.user.role]
  );
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  const isDone = useMemo(() => {
    return currentStep === "validation";
  }, [currentStep]);

  const isDisabled = useMemo(() => {
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
          !(
            tabsOrder.indexOf(currentStep) >=
            tabsOrder.indexOf("immediateActions")
          )
      : isAdminOrManager;
  }, [isAdminOrManager, currentStep]);

  const fps = useAppSelector((state) => state.fpss.fps);

  useEffect(() => {
    if (fps?.cause && Object.keys(fps?.cause).length > 0) {
      const causeList = [...(fps?.cause.causeList || [])];
      const whyList = [...(fps?.cause.whyList || [])];
      console.log("fps?.cause");
      console.log(fps?.cause);
      console.log("fps?.cause");
      setFpsData({
        causeList,
        whyList,
      });
    }
    setCurrentStep(fps?.currentStep || null);
    setSubmitBtnValue(
      ["cause", "defensiveActions", "validation"].includes(
        fps?.currentStep || ""
      )
        ? "Update"
        : "Save"
    );
  }, [fps]);

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
      fpsId: fpsId,
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
        fpsId: fpsId,
        causeList: JSON.stringify(fpsData.causeList),
        whyList: JSON.stringify(fpsData.whyList),
      },
      (formData) => dispatch(createFpsCause({ id: fpsId, fps: formData }))
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsCause);
  };

  return {
    isAdminOrManager,
    currentStep,
    isDisabled,
    isDone,
    fpsData,
    fpsId,
    addNewWhy,
    removeWhy,
    causeData,
    handleCauseChange,
    handleChangeWhyList,
    handleSubmit,
    handleReset,
    submitBtnValue,
  };
};

export default useCauseSection;
