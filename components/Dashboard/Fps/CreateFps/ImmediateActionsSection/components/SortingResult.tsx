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
  categoryData,
  serviceData,
  handleProductChange,
  customSortedQuantityChange,
  customQuantityNOKChange,
  customCategoryChange,
  customServiceChange,
}: {
  fpsData: sortingResultsType;
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  handleProductChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customSortedQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customQuantityNOKChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customCategoryChange: (userCategory: string) => void;
  customServiceChange: (userService: string) => void;
}) => {
  return (
    <div className=" flex flex-col gap-4">
      <CustomInput
        value={fpsData.product}
        onChange={handleProductChange}
        label="produit"
        placeholder="produit"
      />
      <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
        <CustomInput
          value={fpsData.sortedQuantity}
          onChange={customSortedQuantityChange}
          label="quantité triee"
          placeholder="quantité triee"
        />
        <CustomInput
          value={fpsData.quantityNOK}
          onChange={customQuantityNOKChange}
          label="quantité NOK"
          placeholder="quantité NOK"
        />
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

export default SortingResult;
