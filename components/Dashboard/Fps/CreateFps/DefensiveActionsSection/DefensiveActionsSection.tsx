"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import useDefensiveActionsSection from "./useDefensiveActionsSection";

import DefensiveActions from "./DefensiveActions/DefensiveActions";

const DefensiveActionsSection = () => {
  const {
    fpsData,
    fpsId,
    categoryData,
    serviceData,
    handleChangeInArray,
    setFpsData,

    addNewDefensiveAction,
    removeDefensiveAction,

    handleSubmit,
    handleReset,
    submitBtnValue,
  } = useDefensiveActionsSection();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-2">
        <DefensiveActions
          fpsData={fpsData}
          categoryData={categoryData}
          serviceData={serviceData}
          handleChangeInArray={handleChangeInArray}
          setFpsData={setFpsData}
          addNewDefensiveAction={addNewDefensiveAction}
          removeDefensiveAction={removeDefensiveAction}
        />
      </div>
      <div className=" flex flex-col gap-10">
        <CustomInput
          value={fpsId}
          label="fpsId"
          placeholder="fpsId"
          name="fpsId"
          copy
          disabled
        />
        <CustomButtons
          value={submitBtnValue}
          mainButtonOnCLick={handleSubmit}
          secondaryButtonOnCLick={handleReset}
        />
      </div>
    </div>
  );
};

export default DefensiveActionsSection;
