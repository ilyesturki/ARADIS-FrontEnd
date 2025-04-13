"use client";

import CustomSectionHeader from "@/components/Dashboard/Fps/Common/CustomSectionHeader";
import TagAction from "./TagAction";
import { TagActionType } from "@/redux/tag/tagSlice";
import { useTranslations } from "next-intl";
import SectionsSeperator from "@/components/Dashboard/Fps/Common/SectionsSeperator";
import AddSectionButton from "@/components/Dashboard/Fps/Common/AddSectionButton";

interface Props {
  tagData: TagActionType[];
  categoryData: { value: string; label: string }[];
  serviceData: { value: string; label: string }[];
  handleChangeInArray: (
    setState: (updater: (prevState: any) => any) => void,
    value: any,
    name: string,
    index: number
  ) => void;
  setTagData: (updater: (prevState: any) => any) => void;
  addNewTagAction: () => void;
  removeTagAction: (index: number) => void;
  disabled?: boolean;
}
const TagActions = ({
  tagData,
  categoryData,
  serviceData,
  handleChangeInArray,
  setTagData,
  addNewTagAction,
  removeTagAction,
  disabled,
}: Props) => {
  const t = useTranslations("CreateTag.tagActions");
  return (
    <div className=" flex flex-col gap-2">
      {tagData.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2" key={i}>
            <CustomSectionHeader
              title={t("title")}
              i={i}
              handleDeleteSection={() => removeTagAction(i)}
              disabled={disabled}
            />
            <TagAction
              tagData={e}
              categoryData={categoryData}
              serviceData={serviceData}
              customProcedureChange={(
                e: React.ChangeEvent<HTMLTextAreaElement>
              ) =>
                handleChangeInArray(setTagData, e.target.value, "procedure", i)
              }
              customCategoryChange={(userCategory: string) =>
                handleChangeInArray(setTagData, userCategory, "userCategory", i)
              }
              customServiceChange={(userService: string) =>
                handleChangeInArray(setTagData, userService, "userService", i)
              }
              customQuandChange={(
                value: Date | undefined,
                name?: string | undefined
              ) =>
                handleChangeInArray(
                  setTagData,
                  value ? value.toISOString() : "",
                  "quand",
                  i
                )
              }
              disabled={disabled}
            />
            {tagData.length - 1 !== i ? (
              <SectionsSeperator />
            ) : (
              !disabled && (
                <AddSectionButton
                  addNewSection={addNewTagAction}
                  disabled={disabled}
                />
              )
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TagActions;
