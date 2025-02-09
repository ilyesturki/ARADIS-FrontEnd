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

const roleData = [
  {
    value: "qrap",
    label: "Qrap",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

const initialQrapState: flexibleQrapType = {
  quoi: "",
  ref: "",
  quand: "",
  ou: "",
  qui: "",
  comment: "",
  combien: "",
  pourqoui: "",
  image: "",
};
const useCreateQrap = () => {
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [qrapData, setQrapData] = useState<flexibleQrapType>(initialQrapState);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    customHandleChange(e, setQrapData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    customImagesChange<flexibleQrapType>(e, setQrapData, "image", setImageFile);
  };

  // const handleRoleChange = (role: flexibleQrapType["role"]) => {
  //   setQrapData((prevData) => ({
  //     ...prevData,
  //     role,
  //   }));
  // };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      quoi: qrapData.quoi || "",
      ref: qrapData.ref || "",
      quand: qrapData.quand || "",
      ou: qrapData.ou || "",
      qui: qrapData.qui || "",
      comment: qrapData.comment || "",
      combien: qrapData.combien || "",
      pourqoui: qrapData.pourqoui || "",

      image: imageFile ? imageFile.type : "",
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
      { image: imageFile },
      {
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
    roleData,

    qrapData,

    handleChange,
    handleImageChange,

    handleSubmit,
    handleReset,
  };
};

export default useCreateQrap;
