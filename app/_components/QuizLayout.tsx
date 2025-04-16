"use client";

import React, { useEffect, useState } from "react";
import { useQuiz } from "./QuizContext";
import { useLocalStorage } from "./UseLocalStorage";
import { Quiz } from "../_lib/types";
import clsx from "clsx";

export default function QuizLayout() {
  const { topic } = useQuiz();
  const { getItem } = useLocalStorage("value");
  const {
    clientSideData,
    setClientSideData,
    setAnswer,
    answer,
    handleSubmitAnswer,
    correct,
    setCorrect,
    incorrect,
  } = useQuiz();
  const letters = ["A", "B", "C", "D"];

  useEffect(() => {
    setClientSideData(getItem());
  }, []);

  useEffect(() => {
    setCorrect(false);
    setAnswer("");
  }, [clientSideData]);

  if (!clientSideData) {
    return (
      <p className="text-white text-center text-lg mt-[100px]">Loading...</p>
    );
  }
  return (
    <div
      className={` grid grid-cols-1 sm:grid-cols-2 sm:gap-x-[100px]  px-3 pt-6 font-Rubik max-w-[900px] mx-4 sm:mx-auto`}
    >
      <div className="leading-12">
        <p className="mt-1 text-lg italic  text-light-bluish">
          Question 3 of 10
        </p>
        <p className="text-white min-h-[100px] mb-[150px]  font-sans text-xl sm:text-3xl flex flex-col">
          {clientSideData?.questions[0].question}
        </p>
        <div className="block relative bg-navy h-3 rounded-lg">
          <div className="bg-purple absolute top-1/2 transform -translate-y-1/2 w-[100px]  rounded-lg h-2"></div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-y-1.5">
          {clientSideData?.questions[0].options.map((option, i, arr) => (
            <div key={option}>
              <div
                onClick={() => {
                  setAnswer(option);
                  console.log(answer);
                }}
                className={clsx(
                  "flex px-3 py-3 bg-navy  cursor-pointer rounded-xl items-center mt-2 gap-x-4",
                  {
                    "border-2 border-green":
                      correct && option === clientSideData?.questions[0].answer,
                    "border-2 border-cyan-300":
                      incorrect &&
                      option !== answer &&
                      option === clientSideData?.questions[0].answer,
                    "border-red-500":
                      incorrect &&
                      option === answer &&
                      option !== clientSideData?.questions[0].answer,
                    "border-2 border-blue-600":
                      option === answer && !correct && !incorrect,
                    "border-2 border-navy":
                      !correct ||
                      answer !== clientSideData?.questions[0].answer,
                  }
                )}
              >
                <div
                  className={clsx(
                    "h-9 w-9 rounded-md flex justify-center items-center",
                    {
                      "bg-green text-white":
                        correct &&
                        option === clientSideData?.questions[0].answer,

                      "bg-light-orange ":
                        !correct ||
                        option !== clientSideData?.questions[0].answer,
                      "bg-red-500 text-white":
                        incorrect &&
                        option === answer &&
                        option !== clientSideData?.questions[0].answer,
                    }
                  )}
                >
                  {letters[i]}
                </div>
                <span className="text-white font-sans font-bold text-lg">
                  {option}
                </span>
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmitAnswer}
            className="bg-purple cursor-pointer text-white py-3.5 px-3 rounded-xl mt-2.5"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}
