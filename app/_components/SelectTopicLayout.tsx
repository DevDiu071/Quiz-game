"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import data from "@/app/_lib/data.json";
import { Quiz } from "../_lib/types";
import { useQuiz } from "./QuizContext";
import { useLocalStorage } from "./UseLocalStorage";
import clsx from "clsx";

export default function SelectTopicLayout() {
  const quizzes: Quiz[] = data.quizzes;
  const { setTopic } = useQuiz();

  const { setItem, getItem } = useLocalStorage("value");

  return (
    <div className="flex flex-col gap-y-2 lg:gap-y-5 md:gap-y-3 mb-4">
      {quizzes.map((quiz) => (
        <Link
          onClick={() => {
            setTopic(quiz);
            setItem(quiz);
            setTopic(getItem());
            console.log(getItem());
          }}
          key={Math.random()}
          href={`/${quiz.title}`}
        >
          <div
            tabIndex={0}
            className="flex px-[20px] light-shadow sm:max-w-[800px] max-w-[564px] lg:h-[90px] md:h-[70px] h-[64px]  dark:bg-navy bg-topicBg-light cursor-pointer lg:rounded-3xl md:rounded-xl rounded-xl items-center mt-2 gap-x-4"
          >
            <div
              className={clsx(
                " lg:h-[56px] h-[40px] w-[40px] lg:w-[56px] md:w-[40px] md:h-[40px] rounded-md flex justify-center items-center",
                {
                  "bg-light-orange": quiz.title === "HTML",
                  "bg-light-green": quiz.title === "CSS",
                  "bg-lighter-green": quiz.title === "JavaScript",
                  "bg-purple-lighter": quiz.title === "Accessibility",
                }
              )}
            >
              <Image
                src={quiz.icon}
                className="inline-block md:hidden"
                alt="icon"
                width={21}
                height={19}
              />
              <Image
                src={quiz.icon}
                className="hidden md:inline-block"
                alt="icon"
                width={32.5}
                height={25}
              />
            </div>
            <span className="dark:text-white text-text-light font-sans font-bold text-[18px] lg:text-[28px] md:text-[20px] ">
              {quiz.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
