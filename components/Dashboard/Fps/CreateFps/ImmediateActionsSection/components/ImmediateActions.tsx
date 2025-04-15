"use client";

import SectionsSeperator from "../../../Common/SectionsSeperator";
import AddSectionButton from "../../../Common/AddSectionButton";
import { editedFpsImmediateActionsType } from "@/redux/fps/fpsSlice";
import RemoveSectionButton from "../../../Common/RemoveSectionButton";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomSectionHeader from "../../../Common/CustomSectionHeader";
import useImmediateAction from "./useImmediateAction";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
// import ImmediateAction from "./ImmediateAction";

const ImmediateAction = ({
  setFpsData,
  disabled,
  fpsData,
}: {
  setFpsData: (prevState: editedFpsImmediateActionsType) => void;
  disabled: boolean;
  fpsData: editedFpsImmediateActionsType;
}) => {
  const {
    editedImmediateActionData,
    categoryData,
    serviceData,
    customHandleChange,
    handleChangeSelect,
    setEditedImmediateActionData,
    addNewAction,
  } = useImmediateAction(setFpsData, fpsData);
  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex flex-col gap-4">
        <CustomTextArea
          value={editedImmediateActionData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            customHandleChange(e, setEditedImmediateActionData)
          }
          label="pourquoi"
          placeholder="Qu'est ce qu'on a appris du tri ?"
          disabled={disabled}
          name="description"
        />
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
          <CustomSelect
            label="departement"
            value={editedImmediateActionData.userService}
            onChange={(userService: string) =>
              handleChangeSelect(
                setEditedImmediateActionData,
                userService,
                "userService"
              )
            }
            data={serviceData}
            disabled={disabled}
            name="userService"
          />
          <CustomSelect
            label="categorie"
            value={editedImmediateActionData.userCategory}
            onChange={(userCategory: string) =>
              handleChangeSelect(
                setEditedImmediateActionData,
                userCategory,
                "userCategory"
              )
            }
            data={categoryData}
            disabled={disabled}
            name="userCategory"
          />
        </div>
      </div>
      {!disabled && (
        <AddSectionButton addNewSection={addNewAction} disabled={disabled} />
      )}
    </div>
  );
};

export default ImmediateAction;
