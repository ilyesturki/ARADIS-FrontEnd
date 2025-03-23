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
import { useTranslations } from "next-intl";

const CustomDialog = ({
  label,
  isOpen,
  setIsOpen,
  handelDelete,
  isLoading,
}: {
  label: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handelDelete: () => void;
  isLoading?: boolean;
}) => {
  const t = useTranslations("CustomDialog");
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="font-semibold text-error"
      >
        {label}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" py-2 text-lg text-error">
            {t("title", { label })}
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-grayscale-500 leading-loose">
            {t("description", { label })}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handelDelete}
            disabled={isLoading}
            className="bg-error text-grayscale-100 shadow-[0_0_2px] shadow-grayscale-500"
          >
            {t("buttons.delete")}
          </Button>
          <DialogClose>
            <Button
              type="button"
              variant="secondary"
              disabled={isLoading}
              className="shadow-[0_0_2px] shadow-grayscale-500"
            >
              {t("buttons.cancel")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
