"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import data from "@/app/_lib/data.json";
import { Quiz } from "../_lib/types";
import { useQuiz } from "./QuizContext";
import { useLocalStorage } from "./UseLocalStorage";

export default function SelectTopicLayout() {
  const quizzes: Quiz[] = data.quizzes;
  const { setTopic } = useQuiz();

  const { setItem, getItem } = useLocalStorage("value");

  return (
    <div className="flex flex-col gap-y-3">
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
          <div className="flex px-2.5 py-3 bg-navy cursor-pointer rounded-lg items-center mt-2 gap-x-4">
            <div className="bg-light-orange h-9 w-9 rounded-md flex justify-center items-center">
              <Image src={quiz.icon} alt="icon" width={28} height={28} />
            </div>
            <span className="text-white font-sans font-bold text-xl">
              {quiz.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
