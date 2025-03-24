import FpsDetails from "@/components/Dashboard/Dashboard/components/FpsDetails";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { FpsType } from "@/redux/fps/fpsSlice";
import { useState } from "react";

const FpsDetailsDialog = ({ fps }: { fps: FpsType }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
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
