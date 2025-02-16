"use client";
import { FpsType, fpsProblemType } from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  customHandleChange,
  customImagesChange,
  customHandleSubmit,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { verifyFpsValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFps } from "@/redux/fps/fpsThunk";
import { generateQRAPId } from "@/utils/generateQRAPId";
import { problemTypesData } from "@/data/fps";

const initialFpsState: fpsProblemType = {
  type: "Autre",
  quoi: "",
  ref: "",
  quand: "",
  ou: "",
  qui: "",
  comment: "",
  combien: "",
  pourqoui: "",
  image: "",
  images: [],
};
const useProblem = () => {
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const [fpsData, setFpsData] = useState<fpsProblemType>(initialFpsState);
  const [fpsQid, setFpsQid] = useState<FpsType["qid"]>("");

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

  useEffect(() => {
    const qid = generateQRAPId("QRAP", 8);
    setFpsQid(qid);
  }, []);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   customImagesChange<fpsProblemType>(e, setFpsData, "image", setImageFile);
  // };

  useEffect(() => {
    const uid = generateQRAPId("QRAP", 8);
    setFpsData((prevData) => ({
      ...prevData,
      qid: uid,
    }));
  }, []);

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
      type: fpsData.type || "",
      quoi: fpsData.quoi || "",
      ref: fpsData.ref || "",
      quand: fpsData.quand || "",
      ou: fpsData.ou || "",
      qui: fpsData.qui || "",
      comment: fpsData.comment || "",
      combien: fpsData.combien || "",
      pourqoui: fpsData.pourqoui || "",

      image: imageFile ? imageFile.type : "",
      images: imagesFiles.map((file) => file.type).join(", "),
    };
    const newErrors = validateFormFields(
      dataToValidate,
      verifyFpsValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }

    customHandleSubmit(
      e,
      { image: imageFile, images: imagesFiles },
      {
        type: fpsData.type,
        quoi: fpsData.quoi,
        ref: fpsData.ref,
        quand: fpsData.quand,
        ou: fpsData.ou,
        qui: fpsData.qui,
        comment: fpsData.comment,
        combien: fpsData.combien,
        pourqoui: fpsData.pourqoui,
      },
      (formData) => dispatch(createFps(formData)),
      handleReset
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setImageFile(null);
    setFpsData(initialFpsState);
  };

  return {
    problemTypesData,
    typeColors,
    handleTypeChange,
    fpsData,
    fpsQid,
    handleChange,
    handleImageChange,

    handleSubmit,
    handleReset,
  };
};

export default useProblem;
