"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import useDefensiveActionsSection from "./useDefensiveActionsSection";

import DefensiveActions from "./DefensiveActions/DefensiveActions";
import CustomText from "@/components/Common/CustomInput/CustomText";
import { useTranslations } from "next-intl";
import ActionsList from "@/components/Common/ActionsList/ActionsList";
import ActionBox from "@/components/Common/ActionsList/ActionBox";

const DefensiveActionsSection = () => {
  const t = useTranslations("CreateFps.defensiveActions");
  const {
    disabled,
    setFpsData,
    fpsData,
    editDefensiveAction,
    removeDefensiveAction,
    handleSubmit,
    handleReset,
    submitBtnValue,
    isAdminOrManager,
    isDone,
    fpsId,
  } = useDefensiveActionsSection();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <DefensiveActions
        setDefensiveActionsData={setFpsData}
        disabled={disabled}
        defensiveActionsData={fpsData}
      />
      <div className=" flex flex-col gap-10">
        <CustomInput
          value={fpsId}
          label={t("fpsId.label")}
          placeholder={t("fpsId.placeholder")}
          name="fpsId"
          copy
          disabled
        />
        <ActionsList headers={["Service", "Category", "Date", "Actions"]}>
          {fpsData.length > 0 &&
            fpsData.map((e, i) => {
              return (
                <ActionBox
                  key={i}
                  data={[
                    e.userService,
                    e.userCategory,
                    new Date(e.quand).toDateString(),
                  ]}
                  editAction={editDefensiveAction}
                  removeAction={removeDefensiveAction}
                  i={i}
                  disabled={disabled}
                />
              );
            })}
        </ActionsList>
        {isDone ? (
          <CustomText title={t("doneStatus.done")} />
        ) : isAdminOrManager ? (
          <CustomText title={t("doneStatus.notAllowed")} />
        ) : disabled ? (
          <CustomText title={t("doneStatus.disabled")} />
        ) : (
          <CustomButtons
            value={
              submitBtnValue === "Save"
                ? t("buttons.saveButtonText")
                : t("buttons.updateButtonText")
            }
            mainButtonOnCLick={handleSubmit}
            secondaryButtonOnCLick={handleReset}
            secondaryButtonText={t("buttons.secondaryButtonText")}
          />
        )}
      </div>
    </div>
  );
};

export default DefensiveActionsSection;
