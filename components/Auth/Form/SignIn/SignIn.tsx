"use client";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import { faCircleCheck as regularCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthButton from "../../subcomponents/AuthButton";
import useSignIn from "./useSignIn";
const SignInForm = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    keepSignedIn,
    handleKeepSignedIn,
    handleSubmit,
  } = useSignIn();
  return (
    <>
      <div className=" grid gap-y-3 py-3 pb-5 w-72">
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
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={handleKeepSignedIn}
            className="w-6 h-6 flex justify-center items-center"
          >
            {keepSignedIn ? (
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-xl text-greenAccent-900 "
              />
            ) : (
              <FontAwesomeIcon
                icon={regularCircleCheck}
                className=" text-xl text-greenAccent-900 "
              />
            )}
          </button>
          <span className="text-grayscale-400 text-sm font-normal">
            keep me signed in
          </span>
        </div>
      </div>
      <AuthButton onClick={handleSubmit} title={AuthButtonTitle} />
    </>
  );
};

export default SignInForm;
