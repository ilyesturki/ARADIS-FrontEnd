"use client";
import { FpsType, fpsProblemType } from "@/redux/fps/fpsSlice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customHandleChange,
  customImagesChange,
  customHandleSubmit,
  handleChangeSelect,
  customHandleForTostSubmit,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { fpsProblemValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsProblem } from "@/redux/fps/fpsThunk";
import { generateFPSId } from "@/utils/generateFPSId";
import {
  problemTypesData,
  categoryData,
  serviceData,
  machineData,
  initialFpsProblem,
} from "@/data/fps";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { urlToFile } from "@/utils/UrlToFile";
import { useSession } from "next-auth/react";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";

const useProblem = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagesFiles, setImagesFiles] = useState<(File | string | null)[]>(
    Array(5).fill(null)
  );
  const [fpsData, setFpsData] = useState<fpsProblemType>(initialFpsProblem);
  const [fpsId, setFpsId] = useState<FpsType["fpsId"]>("");
  const [submitBtnValue, setSubmitBtnValue] = useState<"Save" | "Update">(
    "Save"
  );

  const { data: session } = useSession({ required: true });

  useEffect(() => {
    setFpsData((prev) => ({
      ...prev,
      userService: session?.user.userService || "",
      userCategory: session?.user.userCategory || "",
    }));
  }, [session]);

  const isAdminOrManager = useMemo(
    () =>
      ["corporaite", "top-management"].includes(
        session?.user.userCategory || ""
      ),
    [session?.user.userCategory]
  );
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  const isDone = useMemo(() => {
    return currentStep === "validation";
  }, [currentStep]);

  const isDisabled = useMemo(
    () => isAdminOrManager || isDone,
    [isAdminOrManager, currentStep]
  );

  const [typeColors, setTypeColors] = useState<{
    textColor: string | undefined;
    className: string | undefined;
  }>({ textColor: "", className: "" });

  const fps = useAppSelector((state) => state.fpss.fps);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let fpsId = params.get("fpsId");
    if (fpsId) {
      setFpsId(fpsId);
      return;
    }

    fpsId = generateFPSId("FPS", 8);
    params.set("fpsId", fpsId);

    router.replace(`/dashboard/fps/create-fps?${params.toString()}`, {
      scroll: false,
    });

    setFpsId(fpsId);
  }, []);

  useEffect(() => {
    if (fps?.problem && Object.keys(fps.problem).length > 0) {
      setFpsData(fps.problem);

      const loadedImages = Array(5).fill(null);
      if (fps?.problem.images !== undefined) {
        fps?.problem.images.forEach((img: string, i: number) => {
          loadedImages[i] = img;
        });
      }
      setImagesFiles(loadedImages);

      const selectedType = problemTypesData.find(
        (e) => e.value === fps.problem.type
      );
      if (selectedType) {
        setTypeColors({
          textColor: selectedType.textColor,
          className: selectedType.className,
        });
      } else {
        setTypeColors({
          textColor: undefined,
          className: undefined,
        });
      }
    }
    setCurrentStep(fps?.currentStep || null);
    setSubmitBtnValue(
      [
        "problem",
        "immediateActions",
        "cause",
        "defensiveActions",
        "validation",
      ].includes(fps?.currentStep || "")
        ? "Update"
        : "Save"
    );
  }, [fps]);

  const handleDeleteImages = (i?: number) => {
    if (i !== undefined) {
      setImagesFiles((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[i] = null;
        return updatedImages;
      });

      if (fpsData.images) {
        const updatedImages = fpsData.images.filter((_, index) => index !== i);
        setFpsData((prevData) => ({
          ...prevData,
          images: updatedImages,
        }));
      }
    } else {
      setImageFile(null);
      setFpsData((prevData) => ({
        ...prevData,
        image: "",
      }));
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    customHandleChange(e, setFpsData);
  };

  const handleClientRisk = () => {
    setFpsData((prevData) => ({
      ...prevData,
      clientRisk: !prevData.clientRisk,
    }));
  };

  const customHandleChangeSelect = (value: string, name?: string) => {
    handleChangeSelect(setFpsData, value, name || "");
  };

  const customHandleChangeDate = (value: Date | undefined, name?: string) => {
    const newValue = value ? value.toISOString() : "";
    handleChangeSelect(setFpsData, newValue, name || "");
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    customImagesChange<fpsProblemType>(
      e,
      setFpsData,
      "image",
      setImageFile,
      setImagesFiles as any,
      index
    );
  };

  const handleTypeChange = (type: fpsProblemType["type"]) => {
    setFpsData((prevData) => ({
      ...prevData,
      type,
    }));

    const selectedType = problemTypesData.find((e) => e.value === type);
    if (selectedType) {
      setTypeColors({
        textColor: selectedType.textColor,
        className: selectedType.className,
      });
    } else {
      setTypeColors({
        textColor: undefined,
        className: undefined,
      });
    }
  };

  function validateAndSubmit(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const formImage = imageFile
        ? imageFile
        : fpsData.image
        ? await urlToFile(fpsData.image as string, "image.png", "image/png")
        : null;
      const formImages: File[] = [];
      for (const image of imagesFiles) {
        if (image instanceof File) {
          formImages.push(image);
        } else if (typeof image === "string") {
          formImages.push(await urlToFile(image, `image.png`, "image/jpeg"));
        }
      }
      const dataToValidate: Record<string, string> = {
        fpsId: fpsId || "",
        type: fpsData.type || "",
        quoi: fpsData.quoi || "",
        ref: fpsData.ref || "",
        quand: fpsData.quand || "",
        ou: fpsData.ou || "",
        comment: fpsData.comment || "",
        combien: fpsData.combien || "",
        pourquoi: fpsData.pourquoi || "",
        clientRisk: fpsData.clientRisk.toString(),
        userCategory: fpsData.userCategory || "",
        userService: fpsData.userService || "",
        machine: fpsData.machine || "",

        image: formImage ? formImage.type : "",
        images: formImages.map((file) => file.type).join(","),
      };
      const newErrors = validateFormFields(
        dataToValidate,
        fpsProblemValidationRules
      );
      if (Object.keys(newErrors).length > 0) {
        handleError({ customError: true, errors: newErrors });
        reject(newErrors);
        return;
      }
      customHandleForTostSubmit(
        { image: formImage, images: formImages },
        {
          type: fpsData.type,
          quoi: fpsData.quoi,
          ref: fpsData.ref,
          quand: fpsData.quand,
          ou: fpsData.ou,
          comment: fpsData.comment,
          combien: fpsData.combien,
          pourquoi: fpsData.pourquoi,
          clientRisk: fpsData.clientRisk.toString(),
          userCategory: fpsData.userCategory,
          userService: fpsData.userService,
          machine: fpsData.machine,
        },
        async (formData) => {
          try {
            const result = await dispatch(
              createFpsProblem({ id: fpsId, fps: formData })
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

  const [isLoading, handleFpsTost] = useApiCallWithToast({
    apiCallFunction: () => validateAndSubmit(),
    handleSuccess: async () => {
      router.refresh();
      handleReset();
    },
    messages: {
      loading: "Editing FPS...", 
      success: "FPS edited successfully!", 
      error: "Failed to edite FPS.", 
    },
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleFpsTost();
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsProblem);
    setTypeColors({ textColor: "", className: "" });
    setImageFile(null);
    setImagesFiles([]);
  };

  return {
    isAdminOrManager,
    currentStep,
    isDisabled,
    isDone,
    problemTypesData,
    typeColors,
    handleTypeChange,
    fpsData,
    fpsId,
    handleChange,
    handleImageChange,
    customHandleChangeSelect,
    customHandleChangeDate,
    categoryData,
    serviceData,
    machineData,
    handleClientRisk,
    handleDeleteImages,

    handleSubmit,
    handleReset,
    submitBtnValue,
    isLoading,
  };
};

export default useProblem;
