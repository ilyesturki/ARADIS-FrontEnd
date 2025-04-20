import TagDetails from "@/components/Dashboard/Dashboard/components/Tag/TagDetails";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TagType } from "@/redux/tag/tagSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TagDetailsDialog = ({
  tag,
  isSelected,
}: {
  tag: TagType;
  isSelected: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(isSelected);
  const router = useRouter();

  useEffect(() => {
    if (isSelected) {
      setIsOpen(true);
    }
  }, [isSelected]);

  const closeDialog = () => {
    setIsOpen(!isOpen);
    // router.push("/dashboard", { scroll: false }); // ✅ Remove tagId from URL when closing
  };
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="w-full py-2.5 bg-greenAccent-900 bg-opacity-80 text-base font-semibold text-grayscale-100 rounded-sm"
      >
        {/* <button className=""> */}
        View Details
        {/* </button> */}
      </DialogTrigger>
      <DialogContent className="max-w-[700px] max-h-screen pt-8 overflow-y-auto dialogScroll">
        <TagDetails tag={tag} dialogMode={true} />
      </DialogContent>
    </Dialog>
  );
};

export default TagDetailsDialog;
