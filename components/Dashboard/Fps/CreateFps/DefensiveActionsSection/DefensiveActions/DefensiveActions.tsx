"use client";

import AddSectionButton from "../../../Common/AddSectionButton";
import {
  editedDefensiveActionType,
} from "@/redux/fps/fpsSlice";
import { useTranslations } from "next-intl";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useDefensiveActions from "./useDefensiveActions";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";

const DefensiveActions = ({
  setDefensiveActionsData,
  disabled,
  defensiveActionsData,
}: {
  setDefensiveActionsData: (prevState: editedDefensiveActionType[]) => void;
  disabled: boolean;
  defensiveActionsData: editedDefensiveActionType[];
}) => {
  const t = useTranslations(
    "CreateFps.defensiveActions.defensiveActions.defensiveAction"
  );

  const {
    editedDefensiveData,
    categoryData,
    serviceData,
    customHandleChange,
    handleChangeSelect,
    setEditedDefensiveData,
    addNewAction,
  } = useDefensiveActions(setDefensiveActionsData, defensiveActionsData);

  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex flex-col gap-4">
        <CustomTextArea
          value={editedDefensiveData.procedure}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            customHandleChange(e, setEditedDefensiveData)
          }
          label={t("procedure.label")}
          placeholder={t("procedure.placeholder")}
          disabled={disabled}
          name="procedure"
        />
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
          <CustomSelect
            label={t("department.label")}
            value={editedDefensiveData.userService}
            onChange={(userService: string) =>
              handleChangeSelect(
                setEditedDefensiveData,
                userService,
                "userService"
              )
            }
            data={serviceData}
            disabled={disabled}
            name="department"
          />
          <CustomSelect
            label={t("category.label")}
            value={editedDefensiveData.userCategory}
            onChange={(userCategory: string) =>
              handleChangeSelect(
                setEditedDefensiveData,
                userCategory,
                "userCategory"
              )
            }
            data={categoryData}
            disabled={disabled}
            name="category"
          />
        </div>
        <CustomDateTimePicker
          label={t("when.label")}
          value={editedDefensiveData.quand}
          onChange={(value: Date | undefined) =>
            handleChangeSelect(
              setEditedDefensiveData,
              value?.toISOString() ?? "",
              "quand"
            )
          }
          disabled={disabled}
          name="when"
        />
      </div>
      {!disabled && (
        <AddSectionButton addNewSection={addNewAction} disabled={disabled} />
      )}
    </div>
  );
};

export default DefensiveActions;
