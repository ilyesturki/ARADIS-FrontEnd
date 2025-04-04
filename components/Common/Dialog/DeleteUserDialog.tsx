import { useAppDispatch } from "@/redux/hooks";
import { deleteUser } from "@/redux/users/usersThunk";
import { useState } from "react";
import CustomDialog from "./CustomDialog";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const DeleteUserDialog = ({ id }: { id: string }) => {
  // Use useTranslations to get localized messages
  const t = useTranslations("UsersPanelPage");
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // const deleteSuccess = useAppSelector((state) => state.users.deleteSuccess);

  // useEffect(() => {
  //   if (deleteSuccess) {
  //     setIsOpen(false);
  //   }
  // }, [deleteSuccess, dispatch, id]);

  // const handelDelete = () => {
  //   dispatch(deleteUser(id));
  // };

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
      loading: t("deleteUser.loading"), // Localize loading message
      success: t("deleteUser.success"), // Localize success message
      error: t("deleteUser.error"), // Localize error message
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
