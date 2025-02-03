"use client";
import { flexibleUserType } from "@/redux/users/usersSlice";
import { getUser, updateUser } from "@/redux/users/usersThunk";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { urlToFile } from "@/utils/UrlToFile";
import {
  customHandleChange,
  customHandleSubmit,
  customImagesChange,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { verifyUserValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";

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
};
const useEditUser = (id: string) => {
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userData, setUserData] = useState(initialUserState);

  const user = useAppSelector((state) => state.users.user);
  const updateSuccess = useAppSelector((state) => state.users.updateSuccess);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getUser(id));
    }
  }, [updateSuccess, dispatch, id]);

  useEffect(() => {
    if (user) {
      const { id, ...rest } = user;
      setUserData(rest);
    }
  }, [user]);

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const formImage = imageFile
      ? imageFile
      : await urlToFile(userData.image as string, "image.png", "image/png");

    const dataToValidate: Record<string, string> = {
      mat: userData.mat || "",
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      role: userData.role || "",
      image: formImage ? formImage.type : "",
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
      {
        image: formImage,
      },
      {
        mat: userData.mat,
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
      },
      (formData) => dispatch(updateUser({ id, user: formData })),
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

    handleSubmit,
    handleReset,
  };
};

export default useEditUser;
