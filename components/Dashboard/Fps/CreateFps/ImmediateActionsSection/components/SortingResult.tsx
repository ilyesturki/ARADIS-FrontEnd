"use client";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
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
  disabled,
}: {
  fpsData: sortingResultsType;
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  handleProductChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customSortedQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customQuantityNOKChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customCategoryChange: (userCategory: string) => void;
  customServiceChange: (userService: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div className=" flex flex-col gap-4">
      <CustomInput
        value={fpsData.product}
        onChange={handleProductChange}
        label="produit"
        placeholder="produit"
        disabled={disabled}
      />
      <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
        <CustomInput
          value={fpsData.sortedQuantity}
          onChange={customSortedQuantityChange}
          label="quantité triee"
          placeholder="quantité triee"
          disabled={disabled}
        />
        <CustomInput
          value={fpsData.quantityNOK}
          onChange={customQuantityNOKChange}
          label="quantité NOK"
          placeholder="quantité NOK"
          disabled={disabled}
        />
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

export default SortingResult;
