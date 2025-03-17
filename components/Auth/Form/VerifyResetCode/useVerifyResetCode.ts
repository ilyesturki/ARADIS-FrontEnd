import { signUp, verifyResetCode } from "@/redux/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleError } from "@/utils/handleError";
import { customHandleChange, customHandleSubmit } from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { verifyResetCodeValidationRules } from "@/utils/validationRules";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useVerifyResetCode = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [resetCode, setResetCode] = useState<string>("");
  const email = useAppSelector((state) => state.auth.email);
  const loading = useAppSelector((state) => state.auth.loading);

  const handleChange = (e: string) => {
    setResetCode(e);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      email: email as string,
      resetCode: resetCode,
    };
    const newErrors = validateFormFields(
      dataToValidate,
      verifyResetCodeValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    customHandleSubmit(
      e,
      {},
      { email: email as string, resetCode: resetCode },
      (formData) =>
        dispatch(verifyResetCode({ data: formData })).then((e: any) => {
          if (!e.error) {
            router.push("/auth/reset-password");
          }
        }),
      handleReset
    );
  };
  const handleReset = () => {
    setResetCode("");
  };

  return {
    resetCode,
    handleChange,
    handleSubmit,
    loading,
  };
};

export default useVerifyResetCode;