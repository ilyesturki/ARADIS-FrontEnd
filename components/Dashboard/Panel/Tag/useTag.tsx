"use client";
import {
  TagType,
  tagActionsType,
  tagActionType,
} from "@/redux/tag/tagSlice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customHandleChange,
  customHandleSubmit,
  handleChangeInArray,
  handleChangeInArrayObject,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import {
  TagActionsRules,
  tagProblemValidationRules,
} from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createTagActions, getTag } from "@/redux/tag/tagThunk";
import { generateTAGId } from "@/utils/generateTAGId";

import {
  initialTagActions,
  categoryData,
  serviceData,
} from "@/data/tag";

import { useRouter} from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const useActionsSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const [tagData, setTagData] = useState<tagActionsType>(
    initialTagActions
  );
  const [tagId, setTagId] = useState<TagType["tagId"]>("");

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
          !(tabsOrder.indexOf(currentStep) >= tabsOrder.indexOf("cause"))
      : isAdminOrManager;
  }, [isAdminOrManager, currentStep]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let tagId = params.get("tagId");

    if (tagId) {
      setTagId(tagId);
      return;
    }
  }, []);

  const tag = useAppSelector((state) => state.tags.tag);

  useEffect(() => {
    if (
      tag?.defensiveActions &&
      Object.keys(tag?.defensiveActions).length > 0
    ) {
      console.log("tag?.defensiveActions");
      console.log(tag?.defensiveActions);
      console.log("tag?.defensiveActions");
      setTagData(tag?.defensiveActions);
    }
    setCurrentStep(tag?.currentStep || null);
    setSubmitBtnValue(
      ["defensiveActions", "validation"].includes(tag?.currentStep || "")
        ? "Update"
        : "Save"
    );
  }, [tag]);

  const addNewAction = () => {
    setTagData((prevData) => [
      ...prevData,
      { procedure: "", userCategory: "", userService: "", quand: "" },
    ]);
  };

  const removeAction = (index: number) => {
    if (tagData.length > 1) {
      setTagData((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      tagId: tagId,
      defensiveActions: JSON.stringify(tagData),
    };
    const newErrors = validateFormFields(
      dataToValidate,
      TagActionsRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }

    customHandleSubmit(
      e,
      {},
      {
        tagId: tagId,
        defensiveActions: JSON.stringify(tagData),
      },
      (formData) =>
        dispatch(createTagActions({ id: tagId, tag: formData }))
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setTagData(initialTagActions);
  };

  return {
    isAdminOrManager,
    currentStep,
    isDisabled,
    isDone,
    tagData,
    tagId,
    categoryData,
    serviceData,
    handleChangeInArray,
    setTagData,
    addNewAction,
    removeAction,

    handleSubmit,
    handleReset,
    submitBtnValue,
  };
};

export default useActionsSection;
