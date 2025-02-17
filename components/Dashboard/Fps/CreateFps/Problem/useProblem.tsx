"use client";
import { FpsType, fpsProblemType } from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  customHandleChange,
  customImagesChange,
  customHandleSubmit,
  handleChangeSelectInArray,
  handleChangeSelect,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { fpsProblemValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFps } from "@/redux/fps/fpsThunk";
import { generateQRAPId } from "@/utils/generateQRAPId";
import {
  problemTypesData,
  categoryData,
  serviceData,
  initialFpsProblem,
} from "@/data/fps";

const useProblem = () => {
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const [fpsData, setFpsData] = useState<fpsProblemType>(initialFpsProblem);
  const [fpsQid, setFpsQid] = useState<FpsType["fpsId"]>("");

  const [typeColors, setTypeColors] = useState<{
    textColor: string | undefined;
    className: string | undefined;
  }>({ textColor: "", className: "" });

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
      clientRisck: !prevData.clientRisck,
    }));
  };

  useEffect(() => {
    const qid = generateQRAPId("QRAP", 8);
    setFpsQid(qid);
  }, []);

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
      setImagesFiles,
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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      qid: fpsQid || "",
      type: fpsData.type || "",
      quoi: fpsData.quoi || "",
      ref: fpsData.ref || "",
      quand: fpsData.quand || "",
      ou: fpsData.ou || "",
      comment: fpsData.comment || "",
      combien: fpsData.combien || "",
      pourqoui: fpsData.pourqoui || "",
      clientRisck: fpsData.clientRisck.toString(),
      userCategory: fpsData.userCategory || "",
      userService: fpsData.userService || "",

      image: imageFile ? imageFile.type : "",
      images: imagesFiles.map((file) => file.type).join(", "),
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
    console.log(fpsQid);
    customHandleSubmit(
      e,
      { image: imageFile, images: imagesFiles },
      {
        qid: fpsQid,
        type: fpsData.type,
        quoi: fpsData.quoi,
        ref: fpsData.ref,
        quand: fpsData.quand,
        ou: fpsData.ou,
        comment: fpsData.comment,
        combien: fpsData.combien,
        pourqoui: fpsData.pourqoui,
        clientRisck: fpsData.clientRisck.toString(),
        userCategory: fpsData.userCategory,
        userService: fpsData.userService,
      },
      (formData) => dispatch(createFps(formData)),
      handleReset
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsProblem);
    setFpsQid(generateQRAPId("QRAP", 8));
    setTypeColors({ textColor: "", className: "" });
    setImageFile(null);
    setImagesFiles([]);
  };

  return {
    problemTypesData,
    typeColors,
    handleTypeChange,
    fpsData,
    fpsQid,
    handleChange,
    handleImageChange,
    customHandleChangeSelect,
    customHandleChangeDate,
    categoryData,
    serviceData,
    handleClientRisk,

    handleSubmit,
    handleReset,
  };
};

export default useProblem;
