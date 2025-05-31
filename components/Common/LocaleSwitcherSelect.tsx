"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState, useTransition, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";

import {
  localeData,
  availableLocales,
  SupportedLocale,
} from "@/config/locales";

export default function LocaleSwitcherSelect({
  defaultValue,
}: {
  defaultValue: SupportedLocale;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocale, setSelectedLocale] =
    useState<SupportedLocale>(defaultValue);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();

  function handleSelect(locale: SupportedLocale) {
    setSelectedLocale(locale);
    setIsOpen(false);
    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });

    startTransition(() => {
      router.replace({ pathname, query, ...params }, { locale });
    });
  }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="max-md:w-full relative inline-block text-left"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="max-md:w-full flex max-md:justify-center items-center gap-1.5 px-3 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border rounded-md"
      >
        <Image
          src={localeData[selectedLocale].flag}
          alt={selectedLocale}
          width={24}
          height={18}
          className="w-5 h-auto rounded-[3px]"
        />
        <span className="text-sm font-medium uppercase">
          {localeData[selectedLocale].short}
        </span>
        <FaAngleDown className="text-xs " />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-700 border rounded-md shadow-lg z-50">
          {availableLocales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleSelect(locale)}
              className="flex items-center gap-1.5 px-2 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <Image
                src={localeData[locale].flag}
                alt={locale}
                width={24}
                height={18}
                className="w-5 h-auto rounded-[3px]"
              />
              <span className="text-sm uppercase text-gray-700 dark:text-gray-300">
                {localeData[locale].short}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
