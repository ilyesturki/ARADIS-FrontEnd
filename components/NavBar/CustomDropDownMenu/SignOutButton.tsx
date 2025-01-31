"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <button
      type="button"
      onClick={handleSignOut}
      className=" flex items-center text-base font-medium text-redAccent-900"
    >
      <LogOut className="mr-3 w-4 h-4 rotate-180" />
      <span>Log out</span>
    </button>
  );
};

export default SignOutButton;
