import { resetPassword } from "@/redux/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleError } from "@/utils/handleError";
import { customHandleChange, customHandleSubmit } from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { resetPasswordValidationRules } from "@/utils/validationRules";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";

interface resetPasswordType {
  password: string;
  passwordConfirm: string;
}

const initialResetPasswordState: resetPasswordType = {
  password: "",
  passwordConfirm: "",
};

const useResetPassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [resetPasswordData, setResetPasswordData] = useState<resetPasswordType>(
    initialResetPasswordState
  );
  const email = useAppSelector((state) => state.auth.email);
  const loading = useAppSelector((state) => state.auth.loading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    customHandleChange(e, setResetPasswordData);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      email: email as string,
      password: resetPasswordData.password,
      passwordConfirm: resetPasswordData.passwordConfirm,
    };
    const newErrors = validateFormFields(
      dataToValidate,
      resetPasswordValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    customHandleSubmit(
      e,
      {},
      {
        email: email as string,
        password: resetPasswordData.password,
        passwordConfirm: resetPasswordData.passwordConfirm,
      },
      (formData) =>
        dispatch(resetPassword({ data: formData })).then((e: any) => {
          if (!e.error) {
            router.push("/auth/login");
          }
        }),
      handleReset
    );
  };
  const handleReset = () => {
    setResetPasswordData(initialResetPasswordState);
  };

  return {
    resetPasswordData,
    handleChange,
    handleSubmit,
    loading,
  };
};

export default useResetPassword;