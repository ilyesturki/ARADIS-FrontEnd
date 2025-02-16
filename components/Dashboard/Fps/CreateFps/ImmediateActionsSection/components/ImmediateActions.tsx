"use client";

import SectionsSeperator from "../../../Common/SectionsSeperator";
import AddSectionButton from "../../../Common/AddSectionButton";
import { immediatActionsType, sortingResultsType } from "@/redux/fps/fpsSlice";
import RemoveSectionButton from "../../../Common/RemoveSectionButton";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomSectionHeader from "../../../Common/CustomSectionHeader";
import SortingResult from "./SortingResult";
import ImmediateAction from "./ImmediateAction";

interface Props {
  immediatActions: immediatActionsType[];
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  addNewImmediateAction: () => void;
  removeImmediateAction: (index: number) => void;
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  handleCategoryChange: (userCategory: string, i: number) => void;
  handleServiceChange: (userService: string, i: number) => void;
}

const ImmediateActions = ({
  immediatActions,
  handleChange,
  addNewImmediateAction,
  removeImmediateAction,
  categoryData,
  serviceData,
  handleCategoryChange,
  handleServiceChange,
}: Props) => {
  return (
    <>
      {immediatActions.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2">
            <CustomSectionHeader
              title="action"
              i={i}
              removeDefensiveAction={() => removeImmediateAction(i)}
            />
            <ImmediateAction
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
            {immediatActions.length - 1 !== i ? (
              <SectionsSeperator />
            ) : (
              <AddSectionButton addNewSection={addNewImmediateAction} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default ImmediateActions;
