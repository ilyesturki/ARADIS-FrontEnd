import { useAppDispatch } from "@/redux/hooks";
import { deleteUser } from "@/redux/users/usersThunk";
import { useState } from "react";
import CustomDialog from "./CustomDialog";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";
import { useRouter } from "@/i18n/navigation";

const DeleteUserDialog = ({ id }: { id: string }) => {
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
      loading: "Deleting account...",
      success: "Account deleted successfully.",
      error: "Could not delete account!",
    },
  });

  return (
    <CustomDialog
      label="User"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handelDelete={executeDeleteAccount}
      isLoading={isLoading}
    />
  );
};

export default DeleteUserDialog;
