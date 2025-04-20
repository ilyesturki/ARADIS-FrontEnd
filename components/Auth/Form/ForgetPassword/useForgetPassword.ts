import { setUserEmail } from "@/redux/auth/authSlice";
import { forgetPassword } from "@/redux/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleError } from "@/utils/handleError";
import { customHandleSubmit } from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { forgetPasswordValidationRules } from "@/utils/validationRules";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";

const useForgetPassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const loading = useAppSelector((state) => state.auth.loading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      email: email,
    };
    const newErrors = validateFormFields(
      dataToValidate,
      forgetPasswordValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    customHandleSubmit(
      e,
      {},
      {
        email: email,
      },
      (formData) =>
        dispatch(forgetPassword({ data: formData })).then((e: any) => {
          if (!e.error) {
            dispatch(setUserEmail(email));
            router.push("/auth/verify-reset-code");
          }
        }),
      handleReset
    );
  };
  const handleReset = () => {
    setEmail("");
  };

  return {
    email,
    handleChange,
    handleSubmit,
    loading,
  };
};

export default useForgetPassword;