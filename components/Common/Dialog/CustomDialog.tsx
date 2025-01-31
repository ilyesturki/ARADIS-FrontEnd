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

const CustomDialog = ({
  label,
  id,
  isOpen,
  setIsOpen,
  handelDelete,
  isLoading,
}: {
  label: string;
  id: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handelDelete: () => void;
  isLoading?: boolean;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="font-semibold text-error"
      >
        Delete {label}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" py-2 text-lg capitalize text-error">
            sure you want to delete this {label} ?
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-grayscale-500 leading-loose">
            This action cannot be undone. This will permanently delete the
            {label} and remove it&lsquo;s data from the servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handelDelete}
            disabled={isLoading}
            className="bg-error text-grayscale-100 shadow-[0_0_2px] shadow-grayscale-500"
          >
            Delete
          </Button>
          <DialogClose>
            <Button
              type="button"
              variant="secondary"
              disabled={isLoading}
              className="shadow-[0_0_2px] shadow-grayscale-500"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
