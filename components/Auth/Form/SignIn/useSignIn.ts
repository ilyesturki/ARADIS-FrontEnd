// import CustomInput from "@/components/Common/CustomInput/CustomInput";
// import Link from "next/link";
// import AuthButton from "../../subcomponents/AuthButton";
import { useState } from "react";
import { signIn } from "next-auth/react";

import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { validateFormFields } from "@/utils/validateFormFields";
import { handleError } from "@/utils/handleError";
import { credentialsSignInValidationRules } from "@/utils/validationRules";

const useSignIn = () => {
  const authEmail = useAppSelector((state) => state.auth.email);
  const [email, setEmail] = useState<string>(authEmail || "");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const errorParam = params.get("error") as string | undefined;
    if (errorParam) {
      toast.error(decodeURIComponent(errorParam));
      console.log(params.get("error"));
    }

    const successParam = params.get("success") as string | undefined;
    if (successParam) {
      toast.success(decodeURIComponent(successParam));
      router.push("/");
    }
  }, [params]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dataToValidate: Record<string, string> = {
      email: email,
      password: password,
    };
    const newErrors = validateFormFields(
      dataToValidate,
      credentialsSignInValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    signIn("credentials", {
      redirect: true,
      callbackUrl: "/",
      email,
      password,
    });
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};

export default useSignIn;
