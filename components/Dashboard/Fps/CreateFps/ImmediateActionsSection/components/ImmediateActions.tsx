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
  handleChangeInArrayObject: (
    setState: (updater: (prevState: any) => any) => void,
    value: any,
    arrayName: string,
    name: string,
    index: number
  ) => void;
  setFpsData: (updater: (prevState: any) => any) => void;
}

const ImmediateActions = ({
  immediatActions,
  handleChange,
  addNewImmediateAction,
  removeImmediateAction,
  categoryData,
  serviceData,
  handleChangeInArrayObject,
  setFpsData,
}: Props) => {
  return (
    <>
      {immediatActions.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2" key={i}>
            <CustomSectionHeader
              title="action"
              i={i}
              removeDefensiveAction={() => removeImmediateAction(i)}
            />
            <ImmediateAction
              fpsData={e}
              categoryData={categoryData}
              serviceData={serviceData}
              customWhyChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChangeInArrayObject(
                  setFpsData,
                  e.target.value,
                  "immediatActions",
                  "description",
                  i
                )
              }
              customCategoryChange={(userCategory: string) =>
                handleChangeInArrayObject(
                  setFpsData,
                  userCategory,
                  "immediatActions",
                  "userCategory",
                  i
                )
              }
              customServiceChange={(userService: string) =>
                handleChangeInArrayObject(
                  setFpsData,
                  userService,
                  "immediatActions",
                  "userService",
                  i
                )
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
