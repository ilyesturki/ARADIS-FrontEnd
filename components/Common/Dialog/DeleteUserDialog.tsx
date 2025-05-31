import { useAppDispatch } from "@/redux/hooks";
import { deleteUser } from "@/redux/users/usersThunk";
import { useState } from "react";
import CustomDialog from "./CustomDialog";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const DeleteUserDialog = ({ id }: { id: string }) => {
  const t = useTranslations("UsersPanelPage");
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const [isLoading, executeDeleteAccount] = useApiCallWithToast({
    apiCallFunction: () => {
      return dispatch(deleteUser(id));
    },
    handleSuccess: async () => {
      setIsOpen(false);
      router.refresh();
    },
    messages: {
      loading: t("deleteUser.loading"), 
      success: t("deleteUser.success"), 
      error: t("deleteUser.error"), 
    },
  });

  return (
    <CustomDialog
      label={t("deleteUser.label")}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handelDelete={executeDeleteAccount}
      isLoading={isLoading}
    />
  );
};

export default DeleteUserDialog;
