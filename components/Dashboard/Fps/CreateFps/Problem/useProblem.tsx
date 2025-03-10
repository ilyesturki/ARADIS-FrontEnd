"use client";
import { FpsType, fpsProblemType } from "@/redux/fps/fpsSlice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customHandleChange,
  customImagesChange,
  customHandleSubmit,
  handleChangeInArray,
  handleChangeSelect,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { fpsProblemValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsProblem, getFps } from "@/redux/fps/fpsThunk";
import { generateFPSId } from "@/utils/generateFPSId";
import {
  problemTypesData,
  categoryData,
  serviceData,
  initialFpsProblem,
} from "@/data/fps";
import { useRouter, useSearchParams } from "next/navigation";
import { urlToFile } from "@/utils/UrlToFile";
import { useSession } from "next-auth/react";

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

  const isAdminOrManager = useMemo(
    () => ["admin", "manager"].includes(session?.user.role ?? ""),
    [session?.user.role]
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
    console.log("fpsId");
    console.log(fpsId);
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

  // Update currentStep when fps changes
  useEffect(() => {
    if (fps?.problem && Object.keys(fps.problem).length > 0) {
      console.log(fps.problem);
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
    console.log("iii");
    console.log(i);
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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const formImage = imageFile
      ? imageFile
      : fpsData.image
      ? await urlToFile(fpsData.image as string, "image.png", "image/png")
      : null;
    let formImages: File[] = [];
    for (const image of imagesFiles) {
      if (image instanceof File) {
        formImages.push(image);
      } else if (typeof image === "string") {
        formImages.push(await urlToFile(image, `image.png`, "image/jpeg"));
      }
    }
    console.log("formImage");
    console.log(imageFile);
    console.log(fpsData.image);
    console.log("formImage");
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

      image: formImage ? formImage.type : "",
      images: formImages.map((file) => file.type).join(","),
    };
    const newErrors = validateFormFields(
      dataToValidate,
      fpsProblemValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    console.log(fpsData);
    console.log(fpsId);
    customHandleSubmit(
      e,
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
      },
      (formData) => dispatch(createFpsProblem({ id: fpsId, fps: formData }))
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsProblem);
    setTypeColors({ textColor: "", className: "" });
    setImageFile(null);
    setImagesFiles([]);
    // dispatch(getFps(fpsId));
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
    handleClientRisk,
    handleDeleteImages,

    handleSubmit,
    handleReset,
    submitBtnValue,
  };
};

export default useProblem;
