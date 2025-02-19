"use client";

import SectionsSeperator from "../../../Common/SectionsSeperator";
import AddSectionButton from "../../../Common/AddSectionButton";
import {
  fpsImmediateActionsType,
  sortingResultsType,
} from "@/redux/fps/fpsSlice";
import RemoveSectionButton from "../../../Common/RemoveSectionButton";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomSectionHeader from "../../../Common/CustomSectionHeader";
import SortingResult from "./SortingResult";

interface Props {
  sortingResults: sortingResultsType[];
  addNewSortingResult: () => void;
  removeSortingResult: (index: number) => void;
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  handleChangeInArrayObject: (
    setState: (updater: (prevState: any) => any) => void,
    value: any,
    arrayName: string,
    name: string,
    index: number
  ) => void;
  setFpsData: (updater: (prevState: any) => any) => void;
}

const SortingResults = ({
  sortingResults,
  addNewSortingResult,
  removeSortingResult,
  categoryData,
  serviceData,
  handleChangeInArrayObject,
  setFpsData,
}: Props) => {
  return (
    <>
      {sortingResults.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2" key={i}>
            <CustomSectionHeader
              title="result"
              i={i}
              removeDefensiveAction={() => removeSortingResult(i)}
            />
            <SortingResult
              fpsData={e}
              categoryData={categoryData}
              serviceData={serviceData}
              handleProductChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeInArrayObject(
                  setFpsData,
                  e.target.value,
                  "sortingResults",
                  "product",
                  i
                )
              }
              customSortedQuantityChange={(
                e: React.ChangeEvent<HTMLInputElement>
              ) =>
                handleChangeInArrayObject(
                  setFpsData,
                  e.target.value,
                  "sortingResults",
                  "sortedQuantity",
                  i
                )
              }
              customQuantityNOKChange={(
                e: React.ChangeEvent<HTMLInputElement>
              ) =>
                handleChangeInArrayObject(
                  setFpsData,
                  e.target.value,
                  "sortingResults",
                  "quantityNOK",
                  i
                )
              }
              customCategoryChange={(userCategory: string) =>
                handleChangeInArrayObject(
                  setFpsData,
                  userCategory,
                  "sortingResults",
                  "userCategory",
                  i
                )
              }
              customServiceChange={(userService: string) =>
                handleChangeInArrayObject(
                  setFpsData,
                  userService,
                  "sortingResults",
                  "userService",
                  i
                )
              }
            />
            {sortingResults.length - 1 !== i ? (
              <SectionsSeperator />
            ) : (
              <AddSectionButton addNewSection={addNewSortingResult} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default SortingResults;
