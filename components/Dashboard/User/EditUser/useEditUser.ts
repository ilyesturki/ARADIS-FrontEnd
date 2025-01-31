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

const statusData = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
];
const initialUserState: flexibleUserType = {
  name: "",
  email: "",
  phone: "",
  password: "",
  image: "",
  status: "active",
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
      const { _id, ...rest } = user;
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

  const handleStatusChange = (status: flexibleUserType["status"]) => {
    setUserData((prevData) => ({
      ...prevData,
      status,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const formImage = imageFile
      ? imageFile
      : await urlToFile(userData.image as string, "image.png", "image/png");

    const dataToValidate: Record<string, string> = {
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      status: userData.status || "",
      password: userData.password || "",
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
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        status: userData.status,
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
    statusData,
    userData,

    handleChange,
    handleImageChange,
    handleStatusChange,

    handleSubmit,
    handleReset,
  };
};

export default useEditUser;
