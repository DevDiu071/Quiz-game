import React from "react";
import Image from "next/image";
import { ClientSideData } from "../_lib/types";
import js from "@/public/assets/images/icon-js.svg";
import { useQuiz } from "./QuizContext";

export default function Result({ clientSideData }: ClientSideData) {
  const { score } = useQuiz();
  return (
    <div className="text-center dark:bg-navy bg-white p-10 rounded-xl">
      <div className="flex items-center justify-center gap-x-3">
        {clientSideData && (
          <div className="bg-light-orange h-9 w-9 lg:w-[56px] lg:h-[56px] rounded-md flex justify-center items-center">
            <Image
              src={clientSideData?.icon || js}
              alt="icon"
              width={32}
              height={32}
              className="hidden md:inline-block"
            />
            <Image
              src={clientSideData?.icon || js}
              alt="icon"
              className="inline-block md:hidden"
              width={28}
              height={28}
            />
          </div>
        )}
        {clientSideData && (
          <span className="dark:text-white text-text-light font-sans font-bold text-xl md:text-[28px]">
            {clientSideData?.title}
          </span>
        )}
      </div>
      <h2 className="text-[95px] dark:text-white text-text-light font-bold">
        {score}
      </h2>
      <p className="text-lg dark:text-light-bluish text-grey-navy">
        Out of {clientSideData.questions.length}
      </p>
    </div>
  );
}
