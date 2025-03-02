"use client";

import SectionsSeperator from "../../../Common/SectionsSeperator";
import DefensiveAction from "./DefensiveAction";
import AddSectionButton from "../../../Common/AddSectionButton";
import { fpsDefensiveActionsType } from "@/redux/fps/fpsSlice";
import RemoveSectionButton from "../../../Common/RemoveSectionButton";
import CustomSectionHeader from "../../../Common/CustomSectionHeader";

interface Props {
  fpsData: fpsDefensiveActionsType;
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  handleChangeInArray: (
    setState: (updater: (prevState: any) => any) => void,
    value: any,
    name: string,
    index: number
  ) => void;
  setFpsData: (updater: (prevState: any) => any) => void;
  addNewDefensiveAction: () => void;
  removeDefensiveAction: (index: number) => void;
}

const DefensiveActions = ({
  fpsData,
  categoryData,
  serviceData,
  handleChangeInArray,
  setFpsData,
  addNewDefensiveAction,
  removeDefensiveAction,
}: Props) => {
  return (
    <>
      {fpsData.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2" key={i}>
            <CustomSectionHeader
              title="procedure"
              i={i}
              removeDefensiveAction={() => removeDefensiveAction(i)}
              handleDelete={() => removeDefensiveAction(i)}
            />
            <DefensiveAction
              fpsData={e}
              categoryData={categoryData}
              serviceData={serviceData}
              customProcedureChange={(
                e: React.ChangeEvent<HTMLTextAreaElement>
              ) =>
                handleChangeInArray(setFpsData, e.target.value, "procedure", i)
              }
              customCategoryChange={(userCategory: string) =>
                handleChangeInArray(setFpsData, userCategory, "userCategory", i)
              }
              customServiceChange={(userService: string) =>
                handleChangeInArray(setFpsData, userService, "userService", i)
              }
              customQuandChange={(
                value: Date | undefined,
                name?: string | undefined
              ) =>
                handleChangeInArray(
                  setFpsData,
                  value ? value.toISOString() : "",
                  "quand",
                  i
                )
              }
            />
            {fpsData.length - 1 !== i ? (
              <SectionsSeperator />
            ) : (
              <AddSectionButton addNewSection={addNewDefensiveAction} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default DefensiveActions;
