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
    <div className="flex flex-col gap-y-2">
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
            className="flex px-2.5 py-3 light-shadow dark:bg-navy bg-topicBg-light cursor-pointer rounded-xl items-center mt-2 gap-x-4"
          >
            <div
              className={clsx(
                " h-9 w-9 rounded-md flex justify-center items-center",
                {
                  "bg-light-orange": quiz.title === "HTML",
                  "bg-light-green": quiz.title === "CSS",
                  "bg-lighter-green": quiz.title === "JavaScript",
                  "bg-purple-lighter": quiz.title === "Accessibility",
                }
              )}
            >
              <Image src={quiz.icon} alt="icon" width={28} height={28} />
            </div>
            <span className="dark:text-white text-text-light font-sans font-bold text-xl">
              {quiz.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
