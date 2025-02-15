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
import {
  fpsDefensiveActionType,
  fpsDefensiveActionsType,
} from "@/redux/qrap/qrapSlice";

const DefensiveAction = ({
  qrapData,
  handleChange,
  categoryData,
  serviceData,
  customCategoryChange,
  customServiceChange,
}: {
  qrapData: fpsDefensiveActionType;
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
        value={qrapData.procedure}
        onChange={handleChange}
        label="procedure"
        placeholder="Mesures finales que nous avons prises"
        name="procedure"
      />
      <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
        <CustomSelect
          label="departement"
          value={qrapData.userService}
          onChange={customServiceChange}
          data={categoryData}
        />
        <CustomSelect
          label="categorie"
          value={qrapData.userService}
          onChange={customCategoryChange}
          data={serviceData}
        />
      </div>
      <CustomDateTimePicker label="Quand" value={qrapData.quand} />
    </div>
  );
};

export default DefensiveAction;
