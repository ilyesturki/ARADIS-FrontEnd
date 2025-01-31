"use client";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import Link from "next/link";
import AuthButton from "../../subcomponents/AuthButton";
import useSignIn from "./useSignIn";
const SignInForm = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const { email, setEmail, password, setPassword, handleSubmit } = useSignIn();
  return (
    <>
      <div className=" grid gap-y-4 py-4">
        <CustomInput
          label="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomInput
          label="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <AuthButton onClick={handleSubmit} title={AuthButtonTitle} />
    </>
  );
};

export default SignInForm;
