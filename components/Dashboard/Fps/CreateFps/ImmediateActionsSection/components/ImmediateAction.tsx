"use client";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import { immediatActionsType } from "@/redux/fps/fpsSlice";

const ImmediateAction = ({
  fpsData,
  categoryData,
  serviceData,
  customWhyChange,
  customCategoryChange,
  customServiceChange,
  disabled,
}: {
  fpsData: immediatActionsType;
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  customWhyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  customCategoryChange: (userCategory: string) => void;
  customServiceChange: (userService: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div className=" flex flex-col gap-4">
      <CustomTextArea
        value={fpsData.description}
        onChange={customWhyChange}
        label="pourquoi"
        placeholder="Qu'est ce qu'on a appris du tri ?"
        disabled={disabled}
      />
      <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
        <CustomSelect
          label="departement"
          value={fpsData.userService}
          onChange={customServiceChange}
          data={serviceData}
          disabled={disabled}
        />
        <CustomSelect
          label="categorie"
          value={fpsData.userCategory}
          onChange={customCategoryChange}
          data={categoryData}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ImmediateAction;
