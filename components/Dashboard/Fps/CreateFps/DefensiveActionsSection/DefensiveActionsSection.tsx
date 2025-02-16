"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import useDefensiveActionsSection from "./useDefensiveActionsSection";

import DefensiveActions from "./DefensiveActions/DefensiveActions";

const DefensiveActionsSection = () => {
  const {
    fpsData,
    fpsQid,
    handleChange,
    categoryData,
    serviceData,
    handleCategoryChange,
    handleServiceChange,
    addNewDefensiveAction,
    removeDefensiveAction,

    handleSubmit,
    handleReset,
  } = useDefensiveActionsSection();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-2">
        <DefensiveActions
          fpsData={fpsData}
          handleChange={handleChange}
          categoryData={categoryData}
          serviceData={serviceData}
          handleCategoryChange={handleCategoryChange}
          handleServiceChange={handleServiceChange}
          addNewDefensiveAction={addNewDefensiveAction}
          removeDefensiveAction={removeDefensiveAction}
        />
      </div>
      <div className=" flex flex-col gap-10">
        <CustomInput
          value={fpsQid}
          onChange={handleChange}
          label="qid"
          placeholder="qid"
          name="qid"
          copy
          disabled
        />
        <CustomButtons
          mainButtonOnCLick={handleSubmit}
          secondaryButtonOnCLick={handleReset}
        />
      </div>
    </div>
  );
};

export default DefensiveActionsSection;
