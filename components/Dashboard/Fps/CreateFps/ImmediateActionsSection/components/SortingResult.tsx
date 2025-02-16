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
import { sortingResultsType } from "@/redux/fps/fpsSlice";

const SortingResult = ({
  fpsData,
  handleChange,
  categoryData,
  serviceData,
  customCategoryChange,
  customServiceChange,
}: {
  fpsData: sortingResultsType;
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
      <CustomInput
        value={fpsData.product}
        onChange={handleChange}
        label="produit"
        placeholder="produit"
        name="produit"
      />
      <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
        <CustomInput
          value={fpsData.sortedQuantity}
          onChange={handleChange}
          label="quantité triee"
          placeholder="quantité triee"
          name="triee"
        />
        <CustomInput
          value={fpsData.quantityNOK}
          onChange={handleChange}
          label="quantité NOK"
          placeholder="quantité NOK"
          name="NOK"
        />
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

export default SortingResult;
