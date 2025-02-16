"use client";

import SectionsSeperator from "../../../Common/SectionsSeperator";
import DefensiveAction from "./DefensiveAction";
import AddSectionButton from "../../../Common/AddSectionButton";
import { fpsDefensiveActionsType } from "@/redux/fps/fpsSlice";
import RemoveSectionButton from "../../../Common/RemoveSectionButton";
import CustomSectionHeader from "../../../Common/CustomSectionHeader";

interface Props {
  fpsData: fpsDefensiveActionsType;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  handleCategoryChange: (userCategory: string, i: number) => void;
  handleServiceChange: (userService: string, i: number) => void;
  addNewDefensiveAction: () => void;
  removeDefensiveAction: (index: number) => void;
}

const DefensiveActions = ({
  fpsData,
  handleChange,
  categoryData,
  serviceData,
  handleCategoryChange,
  handleServiceChange,
  addNewDefensiveAction,
  removeDefensiveAction,
}: Props) => {
  return (
    <>
      {fpsData.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2">
            <CustomSectionHeader
              title="procedure"
              i={i}
              removeDefensiveAction={() => removeDefensiveAction(i)}
            />
            <DefensiveAction
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
