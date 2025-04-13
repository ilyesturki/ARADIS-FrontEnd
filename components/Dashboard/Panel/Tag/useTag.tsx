"use client";
import { TagType, TagActionType } from "@/redux/tag/tagSlice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customHandleChange,
  customHandleSubmit,
  handleChangeInArray,
  handleChangeInArrayObject,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { TagActionsRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createActions } from "@/redux/tag/tagThunk";

import { initialTagActions, categoryData, serviceData } from "@/data/tag";

import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const useTag = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const [tagData, setTagData] = useState<TagActionType[]>(initialTagActions);
  const [tagId, setTagId] = useState<TagType["tagId"]>("");

  const { data: session } = useSession({ required: true });

  const isAdminOrManager = useMemo(
    () => false,

    // ["admin", "manager"].includes(session?.user.role ?? ""),
    [session?.user.role]
  );
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  const isDone = useMemo(() => {
    return currentStep === "done";
  }, [currentStep]);

  const isDisabled = useMemo(() => {
    return currentStep ? isAdminOrManager || isDone : isAdminOrManager;
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
    if (tag?.tagAction && Object.keys(tag?.tagAction).length > 0) {
      setTagData(tag?.tagAction);
    }
    setCurrentStep(tag?.status || null);
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
      tagActions: JSON.stringify(tagData),
    };
    const newErrors = validateFormFields(dataToValidate, TagActionsRules);
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }

    customHandleSubmit(
      e,
      {},
      {
        tagId: tagId,
        tagActions: JSON.stringify(tagData),
      },
      (formData) => dispatch(createActions({ id: tagId, tag: formData }))
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
  };
};

export default useTag;
