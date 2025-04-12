"use client";
// import CreateTag from "@/components/Dashboard/Tag/CreateTag/CreateTag";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getTag } from "@/redux/tag/tagThunk";
import { resetTag } from "@/redux/tag/tagSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import TagPanel from "@/components/Dashboard/Panel/Tag/TagPanel";
import TagHeader from "@/components/Dashboard/Panel/Tag/TagHeader";
import TagActions from "./TagActions/TagActions";

const Tag = () => {
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      console.log("searchParams");
      const params = new URLSearchParams(searchParams.toString());
      let tagId = params.get("tagId");
      if (tagId) {
        console.log("getTag");
        await dispatch(getTag(tagId));
      } else {
        console.log("resetTag");
        await dispatch(resetTag());
      }
    };
    fetch();
  }, [dispatch, searchParams]);

  const {
    isAdminOrManager,
    currentStep,
    isDisabled,
    isDone,
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
  } = useTag();
  return (
    <div className=" grid grid-cols-1 gap-8 px-5 pb-2 bg-sidebar border rounded-md">
      <TagHeader />
      <TagPanel />
      <TagActions />
      {/* <CreateTag /> */}
    </div>
  );
};

export default Tag;
