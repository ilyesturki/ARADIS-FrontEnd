import { TagType } from "@/redux/tag/tagSlice";
import TagPeriority from "./TagPeriority";
import TagStatus from "./TagStatus";

const TagHeader = ({
  tagId,
  status,
}: {
  tagId: string;
  status: TagType["status"];
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-greenAccent-900">
          {tagId}
        </span>
        <TagStatus status={status} />
      </div>
    </div>
  );
};

export default TagHeader;
