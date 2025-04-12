import { TagType } from "@/redux/tag/tagSlice";
// import Tag from "../../Dashboard/components/Tag";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const Tag = dynamic(() => import("../../Dashboard/components/Tag/Tag"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[350px]" />,
});

const TagsGridBox = ({ tags }: { tags: TagType[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
      {tags.map((tag: TagType) => (
        <Tag key={tag.tagId} tag={tag} />
      ))}
    </div>
  );
};

export default TagsGridBox;
