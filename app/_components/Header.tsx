"use client";

import React from "react";
import Image from "next/image";
import moonLight from "@/public/assets/images/icon-moon-light.svg";
import js from "@/public/assets/images/icon-js.svg";
import sunLight from "@/public/assets/images/icon-sun-light.svg";
import { useQuiz } from "./QuizContext";

export default function Header() {
  const { clientSideData } = useQuiz();

  return (
    <div className="flex mt-14 mb-[20px] max-w-[900px]  sm:mx-auto justify-between">
      <div className="flex items-center gap-x-2">
        {clientSideData && (
          <div className="bg-light-orange h-9 w-9 rounded-md flex justify-center items-center">
            <Image
              src={clientSideData?.icon || js}
              alt="icon"
              width={28}
              height={28}
            />
          </div>
        )}
        {clientSideData && (
          <span className="text-white font-sans font-bold text-xl">
            {clientSideData?.title}
          </span>
        )}
      </div>
      <div className="flex gap-x-2 items-center font-main  ">
        <Image src={sunLight} alt="moon-icon" width={15} height={15} />
        <div className="bg-purple relative h-5 w-8 rounded-2xl">
          <div className="bg-white cursor-pointer h-3 w-3 absolute inset-y-0 my-auto right-1 rounded-full flex items-center"></div>
        </div>
        <Image src={moonLight} alt="moon-icon" width={15} height={15} />
      </div>
    </div>
  );
}
