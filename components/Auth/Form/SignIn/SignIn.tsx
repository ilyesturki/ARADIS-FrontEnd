"use client";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

import Link from "next/link";

import CustomInput from "@/components/Common/CustomInput/CustomInput";
import { faCircleCheck as regularCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthButton from "../../subcomponents/AuthButton";
import useSignIn from "./useSignIn";
import CustomAuthInput from "@/components/Common/CustomInput/CustomAuthInput";
const SignInForm = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const { email, setEmail, password, setPassword, handleSubmit, loading } =
    useSignIn();
  return (
    <>
      <CustomAuthInput
        name="username"
        label="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<FaUser />}
      />
      <CustomAuthInput
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<FaLock />}
        className="mt-6"
      />
      <Link
        href="/auth/forget-password"
        className="block text-right text-grayscale-500 text-sm font-medium mt-2 hover:text-greenAccent-900"
      >
        Forgot Password?
      </Link>
      <AuthButton
        title={AuthButtonTitle}
        onClick={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default SignInForm;
