"use client";

import SectionsSeperator from "../../../Common/SectionsSeperator";
import AddSectionButton from "../../../Common/AddSectionButton";
import {
  editedFpsImmediateActionsType,
  sortingResultsType,
} from "@/redux/fps/fpsSlice";
import RemoveSectionButton from "../../../Common/RemoveSectionButton";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomSectionHeader from "../../../Common/CustomSectionHeader";
import SortingResult from "./SortingResult";
import useSortingResultActions from "./useSortingResultActions";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";

const SortingResults = ({
  setFpsData,
  disabled,
  fpsData,
}: {
  setFpsData: (prevState: editedFpsImmediateActionsType) => void;
  disabled: boolean;
  fpsData: editedFpsImmediateActionsType;
}) => {
  const {
    editedSortingResultData,
    categoryData,
    serviceData,
    customHandleChange,
    handleChangeSelect,
    setEditedSortingResultData,
    addNewAction,
  } = useSortingResultActions(setFpsData, fpsData);

  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex flex-col gap-4">
        <CustomInput
          value={editedSortingResultData.product}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            customHandleChange(e, setEditedSortingResultData)
          }
          label="produit"
          placeholder="produit"
          disabled={disabled}
          name="product"
        />
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
          <CustomInput
            value={editedSortingResultData.sortedQuantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              customHandleChange(e, setEditedSortingResultData)
            }
            label="quantité triee"
            placeholder="quantité triee"
            disabled={disabled}
            name="sortedQuantity"
          />
          <CustomInput
            value={editedSortingResultData.quantityNOK}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              customHandleChange(e, setEditedSortingResultData)
            }
            label="quantité NOK"
            placeholder="quantité NOK"
            disabled={disabled}
            name="quantityNOK"
          />
          <CustomSelect
            label="departement"
            value={editedSortingResultData.userService}
            onChange={(userService: string) =>
              handleChangeSelect(
                setEditedSortingResultData,
                userService,
                "userService"
              )
            }
            data={serviceData}
            disabled={disabled}
            name="userService"
          />
          <CustomSelect
            label="categorie"
            value={editedSortingResultData.userCategory}
            onChange={(userCategory: string) =>
              handleChangeSelect(
                setEditedSortingResultData,
                userCategory,
                "userCategory"
              )
            }
            data={categoryData}
            disabled={disabled}
            name="userCategory"
          />
        </div>
      </div>

      {!disabled && (
        <AddSectionButton addNewSection={addNewAction} disabled={disabled} />
      )}
    </div>
  );
};

export default SortingResults;
