"use client";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

const useThemeToggle = (): [string, Dispatch<SetStateAction<string>>] => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const localTheme = localStorage.getItem("theme");
      if (localTheme === "dark") {
        element.classList.add("dark");
      } else if (localTheme === "light") {
        element.classList.remove("dark");
      } else {
        if (darkQuery.matches) {
          element.classList.add("dark");
        } else {
          element.classList.remove("dark");
        }
      }
    };

    applyTheme();

    const changeHandler = (e: MediaQueryListEvent) => {
      if (
        localStorage.getItem("theme") === "system" ||
        !localStorage.getItem("theme")
      ) {
        if (e.matches) {
          element.classList.add("dark");
        } else {
          element.classList.remove("dark");
        }
      }
    };
    darkQuery.addEventListener("change", changeHandler);

    return () => {
      darkQuery.removeEventListener("change", changeHandler);
    };
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("theme", theme);
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
    } else if (theme === "light") {
      element.classList.remove("dark");
    } else {
      const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkQuery.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  }, [theme]);

  return [theme, setTheme];
};

export default useThemeToggle;
