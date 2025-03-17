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
  const { email, setEmail, password, setPassword, handleSubmit } = useSignIn();
  return (
    <div className="mt-6">
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
        href="#"
        className="block text-right text-grayscale-500 text-sm font-medium mt-2 hover:text-greenAccent-900"
      >
        Forgot Password?
      </Link>
      <button
        type="button"
        className="w-full mt-6 py-3 bg-gradient-to-r from-[#2AC68F] to-greenAccent-900 text-white rounded-full text-lg font-semibold transition-all duration-300 hover:from-greenAccent-900 hover:to-[#2AC68F]"
        onClick={handleSubmit}
      >
        {AuthButtonTitle}
      </button>
    </div>
  );
};

export default SignInForm;
