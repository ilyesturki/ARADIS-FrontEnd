"use client";

import SectionsSeperator from "../../../Common/SectionsSeperator";
import AddSectionButton from "../../../Common/AddSectionButton";
import { sortingResultsType } from "@/redux/fps/fpsSlice";
import RemoveSectionButton from "../../../Common/RemoveSectionButton";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomSectionHeader from "../../../Common/CustomSectionHeader";
import SortingResult from "./SortingResult";

interface Props {
  sortingResults: sortingResultsType[];
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  addNewSortingResult: () => void;
  removeSortingResult: (index: number) => void;
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  handleCategoryChange: (userCategory: string, i: number) => void;
  handleServiceChange: (userService: string, i: number) => void;
}

const SortingResults = ({
  sortingResults,
  handleChange,
  addNewSortingResult,
  removeSortingResult,
  categoryData,
  serviceData,
  handleCategoryChange,
  handleServiceChange,
}: Props) => {
  return (
    <>
      {sortingResults.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2">
            <CustomSectionHeader
              title="result"
              i={i}
              removeDefensiveAction={() => removeSortingResult(i)}
            />
            <SortingResult
              fpsData={e}
              handleChange={handleChange}
              categoryData={categoryData}
              serviceData={serviceData}
              customCategoryChange={(userCategory: string) =>
                handleCategoryChange(userCategory, i)
              }
              customServiceChange={(userService: string) =>
                handleServiceChange(userService, i)
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
