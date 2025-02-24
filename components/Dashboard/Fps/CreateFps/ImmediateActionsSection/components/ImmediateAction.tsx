"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";
import CustomSwitch from "@/components/Common/CustomInput/CustomSwitch";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import CustomPicker from "@/components/Common/CustomInput/CustomPicker";
import { immediatActionsType } from "@/redux/fps/fpsSlice";

const ImmediateAction = ({
  fpsData,
  categoryData,
  serviceData,
  customWhyChange,
  customCategoryChange,
  customServiceChange,
}: {
  fpsData: immediatActionsType;
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  customWhyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  customCategoryChange: (userCategory: string) => void;
  customServiceChange: (userService: string) => void;
}) => {
  return (
    <div className=" flex flex-col gap-4">
      <CustomTextArea
        value={fpsData.description}
        onChange={customWhyChange}
        label="pourquoi"
        placeholder="Qu'est ce qu'on a appris du tri ?"
      />
      <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
        <CustomSelect
          label="departement"
          value={fpsData.userService}
          onChange={customServiceChange}
          data={serviceData}
        />
        <CustomSelect
          label="categorie"
          value={fpsData.userCategory}
          onChange={customCategoryChange}
          data={categoryData}
        />
      </div>
    </div>
  );
};

export default ImmediateAction;
