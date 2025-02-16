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
  handleChange,
  categoryData,
  serviceData,
  customCategoryChange,
  customServiceChange,
}: {
  fpsData: immediatActionsType;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  customCategoryChange: (userCategory: string) => void;
  customServiceChange: (userService: string) => void;
}) => {
  return (
    <div className=" flex flex-col gap-4">
      <CustomTextArea
        value={fpsData.description}
        onChange={handleChange}
        label="pourqoui"
        placeholder="Qu'est ce qu'on a appris du tri ?"
        name="pourqoui"
      />
      <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
        <CustomSelect
          label="departement"
          value={fpsData.userService}
          onChange={customServiceChange}
          data={categoryData}
        />
        <CustomSelect
          label="categorie"
          value={fpsData.userService}
          onChange={customCategoryChange}
          data={serviceData}
        />
      </div>
    </div>
  );
};

export default ImmediateAction;
