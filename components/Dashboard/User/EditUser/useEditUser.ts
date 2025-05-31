"use client";
import { flexibleUserType } from "@/redux/users/usersSlice";
import { getUser, updateUser } from "@/redux/users/usersThunk";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { urlToFile } from "@/utils/UrlToFile";
import {
  customHandleChange,
  customHandleForTostSubmit,
  customHandleSubmit,
  customImagesChange,
  handleChangeSelect,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { verifyUserValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";

import { categoryData, serviceData } from "@/data/fps";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";
import { useRouter } from "@/i18n/navigation";

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
};
const useEditUser = (id: string) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userData, setUserData] = useState(initialUserState);

  const user = useAppSelector((state) => state.users.user);
  const updateSuccess = useAppSelector((state) => state.users.updateSuccess);

  const [pageTitle, setPageTitle] = useState(id);

  useEffect(() => {
    if (user) {
      setPageTitle(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

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
      const { id: _id, ...rest } = user;
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

  const customHandleChangeSelect = (value: string, name?: string) => {
    handleChangeSelect(setUserData, value, name || "");
  };

  function validateAndSubmitUser(): Promise<void> {
    return new Promise(async (resolve, reject) => {
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
        userCategory: userData.userCategory || "",
        userService: userData.userService || "",
        image: formImage ? formImage.type : "",
      };
      const newErrors = validateFormFields(
        dataToValidate,
        verifyUserValidationRules
      );
      if (Object.keys(newErrors).length > 0) {
        handleError({ customError: true, errors: newErrors });
        reject(newErrors);
        return;
      }

      customHandleForTostSubmit(
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
          userCategory: userData.userCategory,
          userService: userData.userService,
        },
        async (formData) => {
          try {
            const result = await dispatch(updateUser({ id, user: formData }));

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleEdite();
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setImageFile(null);
    setUserData(initialUserState);
  };

  const [isLoading, handleEdite] = useApiCallWithToast({
    apiCallFunction: () => validateAndSubmitUser(),
    handleSuccess: async () => {
      router.refresh();
      handleReset();
    },
    messages: {
      loading: "Editing user account...", 
      success: "User account edited successfully!", 
      error: "Failed to edite user account.", 
    },
  });

  return {
    pageTitle,
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
    isLoading,
  };
};

export default useEditUser;
