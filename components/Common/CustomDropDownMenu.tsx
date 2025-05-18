"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import LocaleSwitcher from "@/components/Common/LocaleSwitcher";
import ThemeToggle from "@/components/Common/ThemeToggle/ThemeToggle";
import Notifications from "@/components/Common/Notifications/Notifications";

const CustomDropDownMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop view - always visible */}
      <div className="hidden md:flex items-center gap-2">
        <Notifications />
        <ThemeToggle />
        <LocaleSwitcher />
      </div>

      {/* Mobile view - dropdown menu */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-grayscale-200 dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
            <div className="flex flex-col gap-2 p-2">
              <Notifications />
              <ThemeToggle />
              <LocaleSwitcher />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomDropDownMenu;
