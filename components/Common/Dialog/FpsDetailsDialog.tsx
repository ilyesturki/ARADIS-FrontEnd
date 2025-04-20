import FpsDetails from "@/components/Dashboard/Dashboard/components/FpsDetails";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FpsType } from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { useRouter} from "next/navigation";

const FpsDetailsDialog = ({
  fps,
  isSelected,
}: {
  fps: FpsType;
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
    router.push("/dashboard", { scroll: false }); // ✅ Remove fpsId from URL when closing
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
        <FpsDetails fps={fps} dialogMode={true} />
      </DialogContent>
    </Dialog>
  );
};

export default FpsDetailsDialog;
