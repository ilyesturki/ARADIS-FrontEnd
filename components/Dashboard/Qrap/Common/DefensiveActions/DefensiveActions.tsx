"use client";

import SectionsSeperator from "../SectionsSeperator";
import DefensiveAction from "./DefensiveAction";
import AddSectionButton from "../AddSectionButton";
import { fpsDefensiveActionsType } from "@/redux/qrap/qrapSlice";
import RemoveSectionButton from "../RemoveSectionButton";

const DefensiveActions = ({
  qrapData,
  handleChange,
  categoryData,
  serviceData,
  handleCategoryChange,
  handleServiceChange,
  addNewDefensiveAction,
  removeDefensiveAction,
}: {
  qrapData: fpsDefensiveActionsType;
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
}) => {
  return (
    <>
      {qrapData.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold capitalize text-greenAccent-900">
                procedure N°{i + 1}
              </span>
              <RemoveSectionButton
                removeDefensiveAction={() => removeDefensiveAction(i)}
              />
            </div>
            <DefensiveAction
              qrapData={e}
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
            {qrapData.length - 1 !== i ? (
              <SectionsSeperator />
            ) : (
              <AddSectionButton addNewDefensiveAction={addNewDefensiveAction} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default DefensiveActions;
