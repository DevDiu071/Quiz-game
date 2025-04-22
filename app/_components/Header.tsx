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

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { clientSideData } = useQuiz();

  return (
    <div className="flex mt-6 md:mt-14 mb-[20px] max-w-[900px] mx-5  md:mx-auto md:px-3 justify-between">
      <div className="flex items-center gap-x-4">
        {clientSideData && (
          <div className="dark:bg-light-orange bg-icon-bgcolor h-9 w-9 rounded-md flex justify-center items-center">
            <Image
              src={clientSideData?.icon || js}
              alt="icon"
              width={28}
              height={28}
            />
          </div>
        )}
        {clientSideData && (
          <span className="dark:text-white text-text-light font-sans font-bold text-xl">
            {clientSideData?.title}
          </span>
        )}
      </div>
      <div className="flex gap-x-2 items-center font-main  ">
        <Image
          src={sunLight}
          className="dark:inline-block hidden"
          alt="moon-icon"
          width={15}
          height={15}
        />
        <Image
          src={sunDark}
          className="dark:hidden inline-block"
          alt="moon-icon"
          width={15}
          height={15}
        />
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-purple relative transition-position cursor-pointer h-5 w-8 rounded-2xl"
        >
          <div
            className={`bg-white cursor-pointer  h-3 w-3 absolute inset-y-0 my-auto ${
              theme === "dark" ? "right-1" : "left-1"
            } rounded-full flex items-center`}
          ></div>
        </div>
        <Image
          src={moonLight}
          className="dark:inline-block hidden"
          alt="moon-icon"
          width={15}
          height={15}
        />
        <Image
          src={moonDark}
          className="dark:hidden inline-block"
          alt="moon-icon"
          width={15}
          height={15}
        />
      </div>
    </div>
  );
}
