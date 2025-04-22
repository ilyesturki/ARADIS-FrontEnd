"use client";
import { FpsType } from "@/redux/fps/fpsSlice";
import Link from "next/link";

const FpsDetailsDialog = ({
  fps,
  isSelected,
}: {
  fps: FpsType;
  isSelected: boolean;
}) => {
  return (
    <Link
      href={`fps-panel/fps?fpsId=${fps.fpsId}`}
      className="flex justify-center items-center w-full py-2.5 bg-greenAccent-900 bg-opacity-80 text-base font-semibold text-grayscale-100 rounded-sm"
    >
      Show Fps
    </Link>
  );
  // }
  // return (
  //   <Dialog open={isOpen} onOpenChange={closeDialog}>
  //     <DialogTrigger
  //       onClick={() => setIsOpen(true)}
  //       className="w-full py-2.5 bg-greenAccent-900 bg-opacity-80 text-base font-semibold text-grayscale-100 rounded-sm"
  //     >
  //       {/* <button className=""> */}
  //       View Details
  //       {/* </button> */}
  //     </DialogTrigger>
  //     <DialogContent className="max-w-[700px] max-h-screen pt-8 overflow-y-auto dialogScroll">
  //       <FpsDetails fps={fps} dialogMode={true} />
  //     </DialogContent>
  //   </Dialog>
  // );
};

export default FpsDetailsDialog;
