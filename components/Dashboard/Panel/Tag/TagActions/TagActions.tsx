"use client";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomDateTimePicker from "@/components/Common/CustomInput/CustomDateTimePicker";
import { EditedTagActionType, TagActionType } from "@/redux/tag/tagSlice";
import { useTranslations } from "next-intl";
import AddSectionButton from "@/components/Dashboard/Fps/Common/AddSectionButton";
import useTagActions from "./useTagActions";

const TagActions = ({
  setTagData,
  disabled,
  tagData,
}: {
  setTagData: (prevState: EditedTagActionType[]) => void;
  disabled: boolean;
  tagData: TagActionType[];
}) => {
  const t = useTranslations("TagsPanelPage.TagActionsSection.tagActions");

  const {
    editedTagData,
    categoryData,
    serviceData,
    customHandleChange,
    handleChangeSelect,
    setEditedTagData,
    addNewAction,
  } = useTagActions(setTagData, tagData);

  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex flex-col gap-4">
        <CustomTextArea
          value={editedTagData.procedure}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            customHandleChange(e, setEditedTagData)
          }
          label={t("tagAction.procedure.label")}
          placeholder={t("tagAction.procedure.placeholder")}
          disabled={disabled}
          name="procedure"
        />
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
          <CustomSelect
            label={t("tagAction.department.label")}
            value={editedTagData.userService}
            onChange={(userService: string) =>
              handleChangeSelect(setEditedTagData, userService, "userService")
            }
            data={serviceData}
            disabled={disabled}
            name="userService"
          />
          <CustomSelect
            label={t("tagAction.category.label")}
            value={editedTagData.userCategory}
            onChange={(userCategory: string) =>
              handleChangeSelect(setEditedTagData, userCategory, "userCategory")
            }
            data={categoryData}
            disabled={disabled}
            name="userCategory"
          />
        </div>
        <CustomDateTimePicker
          label={t("tagAction.when.label")}
          value={editedTagData.quand}
          onChange={(value: Date | undefined) =>
            handleChangeSelect(
              setEditedTagData,
              value?.toISOString() ?? "",
              "quand"
            )
          }
          disabled={disabled}
          name="quand"
        />
      </div>

      {!disabled && (
        <AddSectionButton addNewSection={addNewAction} disabled={disabled} />
      )}
    </div>
  );
};

export default TagActions;
