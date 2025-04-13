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
import useTag from "./useTag";
import RemoveSectionButton from "../../Fps/Common/RemoveSectionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

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
    tagData,
    tagId,
    categoryData,
    serviceData,
    handleChangeInArray,
    setTagData,

    addNewAction,
    removeAction,

    handleSubmit,
  } = useTag();
  return (
    <div className=" grid grid-cols-1 gap-8 px-5 pb-2 bg-sidebar border rounded-md">
      <TagHeader />
      <TagPanel />
      <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
        <TagActions
          tagData={tagData}
          categoryData={categoryData}
          serviceData={serviceData}
          handleChangeInArray={handleChangeInArray}
          setTagData={setTagData}
          addNewTagAction={addNewAction}
          removeTagAction={removeAction}
          disabled={isDisabled}
        />
        <div className="flex flex-col gap-2 px-2 py-2 bg-sidebar border rounded-md">
          <div className="flex justify-between items-center px-3 py-1.5 bg-grayscale-500 bg-opacity-70 rounded-sm">
            <div className="flex-1 grid grid-cols-3 items-center text-sm font-medium text-grayscale-100">
              <span className="">logistique</span>
              <span className="">logistique</span>
              <span className="">logistique</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`flex justify-center items-center w-5 aspect-1 rounded-full bg-redAccent-900 bg-opacity-90 shadow-[0_0_2px] shadow-grayscale-400 `}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="w-3 h-3 sm:w-4 sm:h-4 text-[8px] sm:text-[10px] text-grayscale-100"
                />
              </button>
              <button
                className={`flex justify-center items-center w-5 aspect-1 rounded-full bg-redAccent-900 bg-opacity-90 shadow-[0_0_2px] shadow-grayscale-400 `}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="w-3 h-3 sm:w-4 sm:h-4 text-[8px] sm:text-[10px] text-grayscale-100"
                />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center px-3 py-1.5 bg-grayscale-500 bg-opacity-70 rounded-sm">
            <div className="flex-1 grid grid-cols-3 items-center text-sm font-medium text-grayscale-100">
              <span className="">logistique</span>
              <span className="">logistique</span>
              <span className="">logistique</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`flex justify-center items-center w-5 aspect-1 rounded-full bg-redAccent-900 bg-opacity-90 shadow-[0_0_2px] shadow-grayscale-400 `}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="w-3 h-3 sm:w-4 sm:h-4 text-[8px] sm:text-[10px] text-grayscale-100"
                />
              </button>
              <button
                className={`flex justify-center items-center w-5 aspect-1 rounded-full bg-redAccent-900 bg-opacity-90 shadow-[0_0_2px] shadow-grayscale-400 `}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="w-3 h-3 sm:w-4 sm:h-4 text-[8px] sm:text-[10px] text-grayscale-100"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <CreateTag /> */}
    </div>
  );
};

export default Tag;
