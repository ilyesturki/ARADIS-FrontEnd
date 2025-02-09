"use client";
import { flexibleQrapType } from "@/redux/qraps/qrapsSlice";
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
import { createQrap } from "@/redux/qraps/qrapsThunk";

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
  mat: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "qrap",
  image: "",
  // status: "inactive",
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

  const handleRoleChange = (role: flexibleQrapType["role"]) => {
    setQrapData((prevData) => ({
      ...prevData,
      role,
    }));
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      mat: qrapData.mat || "",
      firstName: qrapData.firstName || "",
      lastName: qrapData.lastName || "",
      email: qrapData.email || "",
      phone: qrapData.phone || "",
      role: qrapData.role || "",
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
        mat: qrapData.mat,
        role: qrapData.role,
        firstName: qrapData.firstName,
        lastName: qrapData.lastName,
        email: qrapData.email,
        phone: qrapData.phone,
        // status: qrapData.status,
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
    handleRoleChange,

    handleSubmit,
    handleReset,
  };
};

export default useCreateQrap;
