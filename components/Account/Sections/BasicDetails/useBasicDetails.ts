import { UserType } from "@/redux/users/usersSlice";
import { updateUser } from "@/redux/user/userThunk";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { urlToFile } from "@/utils/UrlToFile";
import { customHandleChange, customImagesChange } from "@/utils/handlers";
import { useRouter } from "n";
import { validateFormFields } from "@/utils/validateFormFields";
import { handleError } from "@/utils/handleError";
import { verifyBasicDetailsValidationRules } from "@/utils/validationRules";

type BasicDetailsType = {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
};

const useBasicDetails = (user: UserType | null) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [data, setData] = useState<BasicDetailsType>({
    image: user?.image || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  const [editField, setEditField] = useState<string>("");

  // useEffect(() => {
  //   if (user) {
  //     setData({
  //       image: user?.image || "",
  //       name: user?.name || "",
  //       email: user?.email || "",
  //     });
  //   }
  // }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    customHandleChange(e, setData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    customImagesChange<BasicDetailsType>(e, setData, "image", setImageFile);
  };

  const handleEdit = async (field: keyof BasicDetailsType) => {
    let file: File | null = null;
    let dataToValidate: Record<string, string> = {};

    if (editField === "image") {
      file = imageFile
        ? imageFile
        : data.image
        ? await urlToFile(data.image, "image.png", "image/png")
        : null;
      console.log(file);
      dataToValidate = { image: file ? file.type : "" };
    } else {
      dataToValidate = {
        [editField]: data[editField as keyof BasicDetailsType],
      };
    }
    const newErrors = validateFormFields(
      dataToValidate,
      verifyBasicDetailsValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }

    const formData = new FormData();
    if (field === editField) {
      if (field === "image" && file) {
        formData.append("image", file);
      } else {
        formData.append(field, data[field]);
      }

      dispatch(updateUser({ user: formData }));

      setImageFile(null);
      setEditField("");
      router.refresh();
    } else {
      setEditField(field);
    }
  };
  return { data, handleChange, handleImageChange, handleEdit, editField };
};

export default useBasicDetails;
