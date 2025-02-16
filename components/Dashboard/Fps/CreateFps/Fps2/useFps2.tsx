"use client";
import { flexibleFpsType } from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  customHandleChange,
  customImagesChange,
  customHandleSubmit,
  customHandleSizeChange,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { verifyFpsValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFps } from "@/redux/fps/fpsThunk";
import { generateQRAPId } from "@/utils/generateQRAPId";

const typeData = [
  {
    value: "Securite",
    label: "Securite",
    textColor: "text-red-500",
    className: "shadow-red-500 shadow-[0_0_4px] bg-red-500 bg-opacity-10 ",
  },
  {
    value: "Environnement",
    label: "Environnement",
    textColor: "text-greenAccent-800",
    className:
      "shadow-greenAccent-800 shadow-[0_0_4px] bg-greenAccent-800 bg-opacity-10 ",
  },
  {
    value: "Qualite",
    label: "Qualite",
    textColor: "text-pinkAccent",
    className:
      "shadow-pinkAccent shadow-[0_0_4px] bg-pinkAccent bg-opacity-10 ",
  },

  {
    value: "TRS/Efficience",
    label: "TRS/Efficience",
    textColor: "text-greenAccent-700",
    className:
      "shadow-greenAccent-700 shadow-[0_0_4px] bg-greenAccent-700 bg-opacity-10 ",
  },
  {
    value: "Maintenence",
    label: "Maintenence",
    textColor: "text-red-500",
    className: "shadow-red-500 shadow-[0_0_4px] bg-red-500 bg-opacity-10 ",
  },
  {
    value: "Autre",
    label: "Autre",
    textColor: "text-red-500",
    className: "shadow-red-500 shadow-[0_0_4px] bg-red-500 bg-opacity-10 ",
  },
];

const usersData = [
  { value: "S", label: "qualité" },
  { value: "M", label: "securité" },
  { value: "L", label: "man" },
  { value: "Ls", label: "mansss" },
];

const initialFpsState: flexibleFpsType = {
  qid: "",
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
  users: [],
};
const useFps2 = () => {
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const [fpsData, setFpsData] = useState<flexibleFpsType>(initialFpsState);

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


  const handleUsersChange = (
    data: string,
    i?: number
  ) => {
    customHandleSizeChange(data, setFpsData, i);
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   customImagesChange<flexibleFpsType>(e, setFpsData, "image", setImageFile);
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
    customImagesChange<flexibleFpsType>(
      e,
      setFpsData,
      "image",
      setImageFile,
      setImagesFiles,
      index
    );
  };

  const handleTypeChange = (type: flexibleFpsType["type"]) => {
    setFpsData((prevData) => ({
      ...prevData,
      type,
    }));

    const selectedType = typeData.find((e) => e.value === type);
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
      qid: fpsData.qid || "",
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
        qid: fpsData.qid,
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
    usersData,
    handleUsersChange,


    typeData,
    typeColors,
    handleTypeChange,
    fpsData,

    handleChange,
    handleImageChange,

    handleSubmit,
    handleReset,
  };
};

export default useFps2;
