"use client";

import React from "react";
import Image from "next/image";
import moonLight from "@/public/assets/images/icon-moon-light.svg";
import moonDark from "@/public/assets/images/icon-moon-dark.svg";
import js from "@/public/assets/images/icon-js.svg";
import sunLight from "@/public/assets/images/icon-sun-light.svg";
import sunDark from "@/public/assets/images/icon-sun-dark.svg";
import { useQuiz } from "./QuizContext";
import { useTheme } from "next-themes";
import clsx from "clsx";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { clientSideData } = useQuiz();

  return (
    <div className="flex mt-7 lg:mt-[83px] md:mt-[65px] mb-[20px] lg:mb-[85px] md:mb-[67px] max-w-[1160px] mx-5  md:mx-auto md:px-3 justify-between">
      <div className="flex items-center gap-x-4">
        {clientSideData && (
          <div
            className={clsx(
              " h-9 w-9 rounded-md flex justify-center items-center",
              {
                "bg-light-orange": clientSideData.title === "HTML",
                "bg-light-green": clientSideData.title === "CSS",
                "bg-lighter-green": clientSideData.title === "JavaScript",
                "bg-purple-lighter": clientSideData.title === "Accessibility",
              }
            )}
          >
            <Image
              src={clientSideData?.icon || js}
              alt="icon"
              className="hidden md:inline-block"
              width={28}
              height={28}
            />
            <Image
              src={clientSideData?.icon || js}
              alt="icon"
              className="md:hidden inline-block"
              width={21}
              height={21}
            />
          </div>
        )}
        {clientSideData && (
          <span className="dark:text-white text-text-light font-sans font-bold text-[18px] md:text-[28px]">
            {clientSideData?.title}
          </span>
        )}
      </div>
      <div className="flex gap-x-2 items-center font-main  ">
        <Image
          src={sunLight}
          className="dark:inline-block hidden md:w-[21px] md:h-[21px] w-[14px] h-[14px]"
          alt="moon-icon"
        />
        <Image
          src={sunDark}
          className="dark:hidden inline-block md:w-[21px] md:h-[21px] w-[14px] h-[14px]"
          alt="moon-icon"
        />
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-purple relative cursor-pointer md:h-[20px] w-[32px] h-[20px] lg:w-[48px] lg:h-[28px] md:w-[38px]  rounded-2xl"
        >
          <div
            suppressHydrationWarning
            className={`bg-white absolute !transition-all duration-300 ease-in-out cursor-pointer h-3 w-3 lg:h-5 lg:w-5  inset-y-0 my-auto ${
              theme === "dark" ? "right-1" : "md:right-5 right-4"
            } rounded-full flex items-center`}
          ></div>
        </div>
        <Image
          src={moonLight}
          className="dark:inline-block hidden md:w-[21px] md:h-[21px] w-[14px] h-[14px]"
          alt="moon-icon"
        />
        <Image
          src={moonDark}
          className="dark:hidden inline-block md:w-[21px] md:h-[21px] w-[14px] h-[14px]"
          alt="moon-icon"
        />
      </div>
    </div>
  );
}
