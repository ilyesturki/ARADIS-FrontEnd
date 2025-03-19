"use client";
import React from "react";

const AuthButton = ({
  title,
  onClick,
  loading,
}: {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
}) => {
  return (
    <button
      type="button"
      className="w-full mt-6 py-3 bg-gradient-to-r from-greenAccent-700 to-greenAccent-900 text-white rounded-full text-lg font-semibold transition-all duration-300 hover:from-greenAccent-900 hover:to-greenAccent-700"
      onClick={onClick}
      disabled={loading}
    >
      {title}
    </button>
  );
};

export default AuthButton;
