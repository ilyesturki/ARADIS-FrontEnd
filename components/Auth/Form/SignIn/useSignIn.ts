// import CustomInput from "@/components/Common/CustomInput/CustomInput";
// import Link from "next/link";
// import AuthButton from "../../subcomponents/AuthButton";
import { useState } from "react";
import { signIn } from "next-auth/react";

import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { validateFormFields } from "@/utils/validateFormFields";
import { handleError } from "@/utils/handleError";
import { credentialsSignInValidationRules } from "@/utils/validationRules";

const useSignIn = () => {
  const authEmail = useAppSelector((state) => state.auth.email);

  const loading = useAppSelector((state) => state.auth.loading);

  const [email, setEmail] = useState<string>(authEmail || "");
  const [password, setPassword] = useState<string>("");

  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleKeepSignedIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setKeepSignedIn(!keepSignedIn);
  };

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
      router.push("/dashboard");
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
      callbackUrl: "/dashboard",
      email,
      password,
    });
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    keepSignedIn,
    handleKeepSignedIn,
    handleSubmit,
    loading,
  };
};

export default useSignIn;
