"use client";
import { flexibleQrapType } from "@/redux/qrap/qrapSlice";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  customHandleChange,
  customImagesChange,
  customHandleSubmit,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { verifyQrapValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createQrap } from "@/redux/qrap/qrapThunk";

const typeData = [
  {
    value: "Securite",
    label: "Securite",
  },
  {
    value: "Environnement",
    label: "Environnement",
  },
  {
    value: "Qualite",
    label: "Qualite",
  },

  {
    value: "TRS/Efficience",
    label: "TRS/Efficience",
  },
  {
    value: "Maintenence",
    label: "Maintenence",
  },
  {
    value: "Autre",
    label: "Autre",
  },
];
const initialQrapState: flexibleQrapType = {
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
const useCreateQrap = () => {
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const [qrapData, setQrapData] = useState<flexibleQrapType>(initialQrapState);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    customHandleChange(e, setQrapData);
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   customImagesChange<flexibleQrapType>(e, setQrapData, "image", setImageFile);
  // };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    customImagesChange<flexibleQrapType>(
      e,
      setQrapData,
      "image",
      setImageFile,
      setImagesFiles,
      index
    );
  };

  const handleTypeChange = (role: flexibleQrapType["type"]) => {
    setQrapData((prevData) => ({
      ...prevData,
      role,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      type: qrapData.type || "",
      quoi: qrapData.quoi || "",
      ref: qrapData.ref || "",
      quand: qrapData.quand || "",
      ou: qrapData.ou || "",
      qui: qrapData.qui || "",
      comment: qrapData.comment || "",
      combien: qrapData.combien || "",
      pourqoui: qrapData.pourqoui || "",

      image: imageFile ? imageFile.type : "",
      images: imagesFiles.map((file) => file.type).join(", "),
    };
    const newErrors = validateFormFields(
      dataToValidate,
      verifyQrapValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }

    customHandleSubmit(
      e,
      { image: imageFile, images: imagesFiles },
      {
        type: qrapData.type,
        quoi: qrapData.quoi,
        ref: qrapData.ref,
        quand: qrapData.quand,
        ou: qrapData.ou,
        qui: qrapData.qui,
        comment: qrapData.comment,
        combien: qrapData.combien,
        pourqoui: qrapData.pourqoui,
      },
      (formData) => dispatch(createQrap(formData)),
      handleReset
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setImageFile(null);
    setQrapData(initialQrapState);
  };

  return {
    typeData,
    handleTypeChange,
    qrapData,

    handleChange,
    handleImageChange,

    handleSubmit,
    handleReset,
  };
};

export default useCreateQrap;
