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
import ActionsList from "@/components/Common/ActionsList/ActionsList";
import ActionBox from "@/components/Common/ActionsList/ActionBox";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";

import { useTranslations } from "next-intl";
import PageTitle from "@/components/Common/PageTitle";

const Tag = () => {
  const t = useTranslations("TagsPanelPage");

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
    disabled,
    setTagData,
    tagData,
    editAction,
    removeAction,
    handleSubmit,
    handleReset,
  } = useTag();
  return (
    <div className=" grid grid-cols-1 gap-8 px-5 pb-6 bg-sidebar border rounded-md">
      <TagHeader />
      <PageTitle title={t("TagPanel.title")} />
      <TagPanel />
      <PageTitle title={t("TagActionsSection.tagActions.title")} />
      <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
        <TagActions
          setTagData={setTagData}
          disabled={disabled}
          tagData={tagData} 
        /> 

        <div className="grid grid-rows-[1fr_auto] grid-cols-1 gap-4">
          <ActionsList headers={["Service", "Category", "Date", "Actions"]}>
            {tagData.length > 0 &&
              tagData.map((e, i) => {
                return (
                  <ActionBox
                    key={i}
                    data={[
                      e.userService,
                      e.userCategory,
                      new Date(e.quand).toDateString(),
                    ]}
                    editAction={editAction}
                    removeAction={removeAction}
                    i={i}
                  />
                );
              })}
          </ActionsList>
          <CustomButtons
            mainButtonOnCLick={handleSubmit}
            secondaryButtonOnCLick={handleReset}
            mainButtonText={t("TagActionsSection.mainButton")}
            secondaryButtonText={t("TagActionsSection.secondaryButton")}
          />
        </div>
      </div>
    </div>
  );
};

export default Tag;
