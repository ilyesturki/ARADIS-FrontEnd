import { useAppDispatch } from "@/redux/hooks";
import { deleteFps } from "@/redux/fps/fpsThunk";
import { useState } from "react";
import CustomDialog from "./CustomDialog";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const DeleteFpsDialog = ({ id }: { id: string }) => {
  const t = useTranslations("FpssPanelPage");
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);


  const router = useRouter();

  const [isLoading, executeDeleteAccount] = useApiCallWithToast({
    apiCallFunction: () => {
      return dispatch(deleteFps(id));
    },
    handleSuccess: async () => {
      setIsOpen(false);
      router.refresh();
    },
    messages: {
      loading: t("deleteFps.loading"), 
      success: t("deleteFps.success"), 
      error: t("deleteFps.error"), 
    },
  });

  return (
    <CustomDialog
      label={t("deleteFps.label")}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handelDelete={executeDeleteAccount}
      isLoading={isLoading}
    />
  );
};

export default DeleteFpsDialog;
