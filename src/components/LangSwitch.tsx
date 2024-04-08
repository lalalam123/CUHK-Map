"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { IoLanguageSharp } from "react-icons/io5";

const LangSwitcher: React.FC = () => {
  interface Option {
    country: string;
    code: string;
    flag: string;
  }

  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSettings");

  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);

  const options: Option[] = [
    { country: t("en"), code: "en", flag: "./en-flag.png" },
    { country: t("cn"), code: "cn", flag: "./cn-flag.png" },
  ];

  const setOption = (option: Option) => {
    setIsOptionsExpanded(false);
    router.push(`/${option.code}`);
  };

  return (
    <div className="flex items-center justify-center bg-dark">
      <div className="text-lg w-72">
        <button
          className="my-2 justify-between w-full border border-black text-black dark:border-white dark:text-white hover:text-white dark:border-light dark:text-light bg-dark hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-dark dark:hover:bg-gray-700 dark:focus:ring-gray-500"
          onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
          onBlur={() => setIsOptionsExpanded(false)}
        >
          <IoLanguageSharp />
          {t("pick")}
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-4 w-4 transform transition-transform duration-200 ease-in-out ${
              isOptionsExpanded ? "rotate-180" : "rotate-0"
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          className={`transition-transform duration-500 ease-custom ${
            !isOptionsExpanded
              ? "-translate-y-1/2 scale-y-0 opacity-0"
              : "translate-y-0 scale-y-100 opacity-100"
          }`}
        >
          <ul className="absolute left-0 right-0 my-2 bg-gray-700 divide-y rounded-lg shadow-lg overflow-hidden">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-3 py-3 transition-colors duration-300 hover:bg-gray-700 text-light flex items-center cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setOption(option);
                }}
                onClick={() => setIsOptionsExpanded(false)}
              >
                <Image src={option.flag} width={"20"} height={"20"} alt="logo" />
                &nbsp;&nbsp;{option.country}
                {pathname === `/${option.code}` && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-7 h-7 text-success ml-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LangSwitcher;
