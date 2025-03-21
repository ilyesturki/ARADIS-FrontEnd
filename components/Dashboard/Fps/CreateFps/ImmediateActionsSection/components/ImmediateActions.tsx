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
  immediateActions: immediatActionsType[];
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  addNewImmediateAction: () => void;
  removeImmediateAction: (index: number) => void;
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
  disabled?: boolean;
}

const ImmediateActions = ({
  immediateActions,
  handleChange,
  addNewImmediateAction,
  removeImmediateAction,
  categoryData,
  serviceData,
  handleChangeInArrayObject,
  setFpsData,
  disabled,
}: Props) => {
  return (
    <>
      {immediateActions.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2" key={i}>
            <CustomSectionHeader
              title="action"
              i={i}
              handleDeleteSection={() => removeImmediateAction(i)}
              disabled={disabled}
            />
            <ImmediateAction
              fpsData={e}
              categoryData={categoryData}
              serviceData={serviceData}
              customWhyChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChangeInArrayObject(
                  setFpsData,
                  e.target.value,
                  "immediateActions",
                  "description",
                  i
                )
              }
              customCategoryChange={(userCategory: string) =>
                handleChangeInArrayObject(
                  setFpsData,
                  userCategory,
                  "immediateActions",
                  "userCategory",
                  i
                )
              }
              customServiceChange={(userService: string) =>
                handleChangeInArrayObject(
                  setFpsData,
                  userService,
                  "immediateActions",
                  "userService",
                  i
                )
              }
              disabled={disabled}
            />
            {immediateActions.length - 1 !== i ? (
              <SectionsSeperator />
            ) : (
              !disabled && (
                <AddSectionButton
                  addNewSection={addNewImmediateAction}
                  disabled={disabled}
                />
              )
            )}
          </div>
        );
      })}
    </>
  );
};

export default ImmediateActions;
