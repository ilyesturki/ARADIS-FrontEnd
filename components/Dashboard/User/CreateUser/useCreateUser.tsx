"use client";
import { flexibleUserType } from "@/redux/users/usersSlice";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  customHandleChange,
  customImagesChange,
  customHandleSubmit,
  handleChangeSelect,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { verifyUserValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createUser } from "@/redux/users/usersThunk";

import { categoryData, serviceData } from "@/data/fps";

const roleData = [
  {
    value: "user",
    label: "User",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

const initialUserState: flexibleUserType = {
  mat: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "user",
  image: "",
  userCategory: "",
  userService: "",
  // status: "inactive",
};
const useCreateUser = () => {
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<flexibleUserType>(initialUserState);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    customHandleChange(e, setUserData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    customImagesChange<flexibleUserType>(e, setUserData, "image", setImageFile);
  };

  const handleRoleChange = (role: flexibleUserType["role"]) => {
    setUserData((prevData) => ({
      ...prevData,
      role,
    }));
  };

  const customHandleChangeSelect = (value: string, name?: string) => {
    handleChangeSelect(setUserData, value, name || "");
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      mat: userData.mat || "",
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      role: userData.role || "",
      userCategory: userData.userCategory || "",
      userService: userData.userService || "",
      image: imageFile ? imageFile.type : "",
    };
    const newErrors = validateFormFields(
      dataToValidate,
      verifyUserValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }

    customHandleSubmit(
      e,
      { image: imageFile },
      {
        mat: userData.mat,
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        userCategory: userData.userCategory,
        userService: userData.userService,
        // status: userData.status,
      },
      (formData) => dispatch(createUser(formData)),
      handleReset
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setImageFile(null);
    setUserData(initialUserState);
  };

  return {
    roleData,

    userData,

    handleChange,
    handleImageChange,
    handleRoleChange,

    categoryData,
    serviceData,
    customHandleChangeSelect,

    handleSubmit,
    handleReset,
  };
};

export default useCreateUser;
