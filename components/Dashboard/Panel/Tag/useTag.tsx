"use client";
import { TagType, EditedTagActionType } from "@/redux/tag/tagSlice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customHandleForTostSubmit,
  customHandleSubmit,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { TagActionsRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createActions } from "@/redux/tag/tagThunk";

import { initialTagActions } from "@/data/tag";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";
import { useRouter } from "@/i18n/navigation";

const useTag = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [tagData, setTagData] =
    useState<EditedTagActionType[]>(initialTagActions);
  const [tagId, setTagId] = useState<TagType["tagId"]>("");

  const { data: session } = useSession({ required: true });

  const isAdminOrManager = useMemo(
    () => false,

    [session?.user.role]
  );
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  const isDone = useMemo(() => {
    return currentStep === "done";
  }, [currentStep]);

  const disabled = useMemo(() => {
    return currentStep ? isAdminOrManager || isDone : isAdminOrManager;
  }, [isAdminOrManager, currentStep]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const tagId = params.get("tagId");

    if (tagId) {
      setTagId(tagId);
      return;
    }
  }, []);

  const tag = useAppSelector((state) => state.tags.tag);

  useEffect(() => {
    if (tag?.tagActions && Object.keys(tag?.tagActions).length > 0) {
      setTagData(tag?.tagActions);
    }
    setCurrentStep(tag?.status || null);
  }, [tag]);

  const editAction = (index: number) => {
    const newTagData = tagData
      .map((e) => (e.edit ? { ...e, edit: false } : e))
      .map((e, i) => {
        return i === index ? { ...e, edit: true } : e;
      });

    setTagData(newTagData);
  };

  const removeAction = (index: number) => {
    setTagData((prevData) => prevData.filter((_, i) => i !== index));
  };

  function validateAndSubmit(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const dataToValidate: Record<string, string> = {
        tagId: tagId,
        tagActions: JSON.stringify(tagData),
      };
      const newErrors = validateFormFields(dataToValidate, TagActionsRules);
      if (Object.keys(newErrors).length > 0) {
        handleError({ customError: true, errors: newErrors });
        reject(newErrors);
        return;
      }

      customHandleForTostSubmit(
        {},
        {
          tagId: tagId,
          actions: JSON.stringify(tagData),
        },
        async (formData) => {
          try {
            const result = await dispatch(
              createActions({ id: tagId, tag: formData })
            );

            if (result?.meta?.requestStatus === "rejected") {
              throw "Unknown error";
            }

            resolve();
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }

  const [isLoading, handleTagTost] = useApiCallWithToast({
    apiCallFunction: () => validateAndSubmit(),
    handleSuccess: async () => {
      router.refresh();
      handleReset();
    },
    messages: {
      loading: "Editing TAG...", 
      success: "TAG edited successfully!", 
      error: "Failed to edite TAG.", 
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleTagTost();
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setTagData(initialTagActions);
  };

  return {
    disabled,
    setTagData,
    tagData,
    editAction,
    removeAction,
    handleSubmit,
    handleReset,
    tagId,
    currentStep,
    isLoading,
  };
};

export default useTag;
