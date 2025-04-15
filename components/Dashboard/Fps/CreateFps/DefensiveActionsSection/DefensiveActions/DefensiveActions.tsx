"use client";

import SectionsSeperator from "../../../Common/SectionsSeperator";
import DefensiveAction from "./DefensiveAction";
import AddSectionButton from "../../../Common/AddSectionButton";
import { fpsDefensiveActionsType } from "@/redux/fps/fpsSlice";
import RemoveSectionButton from "../../../Common/RemoveSectionButton";
import CustomSectionHeader from "../../../Common/CustomSectionHeader";
import { useTranslations } from "next-intl";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";

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
  disabled?: boolean;
}

const DefensiveActions = ({
  setDefensiveActionsData,
  disabled,
  defensiveActionsData,
}: {
  setDefensiveActionsData: (
    prevState: EditedDefensiveActionsActionType[]
  ) => void;
  disabled: boolean;
  defensiveActionsData: DefensiveActionsActionType[];
}) => {
  const t = useTranslations("CreateFps.defensiveActions.defensiveActions");

  const {
    editedDefensiveActionsData,
    categoryData,
    serviceData,
    customHandleChange,
    handleChangeSelect,
    setEditedDefensiveActionsData,
    addNewAction,
  } = useDefensiveActions(setDefensiveActionsData, defensiveActionsData);

  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex flex-col gap-4">
        <CustomTextArea
          value={editedDefensiveActionsData.procedure}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            customHandleChange(e, setEditedDefensiveActionsData)
          }
          label={t("procedure.label")}
          placeholder={t("procedure.placeholder")}
          disabled={disabled}
          name="procedure"
        />
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
          <CustomSelect
            label={t("department.label")}
            value={editedDefensiveActionsData.userService}
            onChange={(userService: string) =>
              handleChangeSelect(setEditedDefensiveActionsData, userService, "userService")
            }
            data={serviceData}
            disabled={disabled}
            name="department"
          />
          <CustomSelect
            label={t("category.label")}
            value={editedDefensiveActionsData.userCategory}
            onChange={(userCategory: string) =>
              handleChangeSelect(setEditedDefensiveActionsData, userCategory, "userCategory")
            }
            data={categoryData}
            disabled={disabled}
            name="category"
          />
        </div>
        <CustomDateTimePicker
          label={t("when.label")}
          value={editedDefensiveActionsData.quand}
          onChange={(value: Date | undefined, name?: string | undefined) =>
            handleChangeSelect(
              setEditedDefensiveActionsData,
              value?.toISOString() ?? "",
              "quand"
            )
          }
          disabled={disabled}
          name="when"
          // value ? value.toISOString() : ""
        />
      </div>
      {!disabled && (
        <AddSectionButton addNewSection={addNewAction} disabled={disabled} />
      )}
    </div>
  );
};

export default DefensiveActions;

{
  /* <DefensiveAction
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
disabled={disabled}
/> */
}
