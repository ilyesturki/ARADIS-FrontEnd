import React from "react";
import TagHeader from "./TagHeader";
import TagProgress from "./TagProgress";
import TagDescription from "./TagDescription";
import { TagType } from "@/redux/tag/tagSlice";
import CustomSelectImages from "@/components/Common/CustomInput/CustomSelectImages";

const TagDetails = ({
  tag,
  dialogMode,
}: {
  tag: TagType;
  dialogMode?: boolean;
}) => {
  return (
    <div className={`${dialogMode && "grid md:grid-cols-2 gap-2 py-1.5"}`}>
      <div className="w-full px-1">
        <TagHeader tagId={tag.tagId} status={tag.status} />
        <hr className="border-neutral-200 my-3" />
        <TagProgress status={tag.status} />
        <TagDescription
          zone={tag.zone}
          machine={tag.machine}
          equipment={tag.equipment}
          userImage={tag.user?.image}
          fullName={`${tag.user?.firstName} ${tag.user?.lastName}`}
          dialogMode={dialogMode}
        />
      </div>
      {dialogMode && (
        <div className="">
          <CustomSelectImages
            label="tag Images"
            imageCover={tag.image || ""}
            images={tag.images || []}
            disabled={true}
            viewOnly={true}
          />
        </div>
      )}
    </div>
  );
};

export default TagDetails;
