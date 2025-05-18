// import React from "react";
// import TagHeader from "../TagHeader";
// import Progress from "../TagProgress";
// import TagDescription from "../TagDescription";
// import TagProgress from "../TagProgress";
// import DetailsButton from "../DetailsButton";
import { TagType } from "@/redux/tag/tagSlice";
import TagDetails from "./TagDetails";
import TagDetailsDialog from "@/components/Common/Dialog/TagDetailsDialog";

const Tag = ({
  tag,
  isSelected = false,
}: {
  tag: TagType;
  isSelected?: boolean;
}) => {
  return (
    <div className="px-3 py-3 bg-grayscale-100  dark:bg-neutral-800/50  dark:border-neutral-700  border rounded-md">
      <TagDetails tag={tag} />
      <TagDetailsDialog tag={tag} isSelected={isSelected} />
    </div>
  );
};

export default Tag;
