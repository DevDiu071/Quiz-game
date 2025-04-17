"use client";

import React, { useEffect, useState } from "react";
import { useQuiz } from "./QuizContext";
import { useLocalStorage } from "./UseLocalStorage";
import iconError from "@/public/assets/images/icon-error.svg";
import { Quiz } from "../_lib/types";
import Image from "next/image";
import clsx from "clsx";
import Result from "./Result";
import Link from "next/link";

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
    setIncorrect,
    unselectedError,
    questionNum,
    showResult,
    handlePlayAgain,
  } = useQuiz();
  const letters = ["A", "B", "C", "D"];

  useEffect(() => {
    setClientSideData(getItem());
  }, []);

  useEffect(() => {
    setCorrect(false);
    setAnswer("");
    setIncorrect(false);
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
      <div
        className={clsx({
          "leading-6": showResult,
          "leading-12": !showResult,
        })}
      >
        {!showResult && (
          <p className="mt-1 text-lg italic  text-light-bluish">
            Question {questionNum + 1} of {clientSideData.questions.length}
          </p>
        )}
        {!showResult && (
          <p className="text-white min-h-[100px] mb-[150px]  font-sans text-xl sm:text-3xl flex flex-col">
            {clientSideData?.questions[questionNum].question}
          </p>
        )}
        {showResult && (
          <div className="min-h-[100px] mb-[150px] text-xl sm:text-3xl text-white">
            <p>Quiz Completed</p>
            <p className="font-bold">You Scored...</p>
          </div>
        )}
        {!showResult && (
          <div className="block relative bg-navy h-3 rounded-lg">
            <div className="bg-purple absolute top-1/2 transform -translate-y-1/2 w-[100px]  rounded-lg h-2"></div>
          </div>
        )}
      </div>
      <div>
        {!showResult ? (
          <div className="flex flex-col gap-y-1.5">
            {clientSideData?.questions[questionNum].options.map((option, i) => (
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
                        correct &&
                        option ===
                          clientSideData?.questions[questionNum].answer,
                      "border-2 border-yellow-100":
                        incorrect &&
                        option !== answer &&
                        option ===
                          clientSideData?.questions[questionNum].answer,
                      "border-red-500":
                        incorrect &&
                        option === answer &&
                        option !==
                          clientSideData?.questions[questionNum].answer,
                      "border-2 border-blue-600":
                        option === answer && !correct && !incorrect,
                      "border-2 border-navy":
                        !correct ||
                        answer !==
                          clientSideData?.questions[questionNum].answer,
                    }
                  )}
                >
                  <div
                    className={clsx(
                      "h-9 w-9 rounded-md flex justify-center items-center",
                      {
                        "bg-green text-white":
                          correct &&
                          option ===
                            clientSideData?.questions[questionNum].answer,

                        "bg-light-orange ":
                          !correct ||
                          option !==
                            clientSideData?.questions[questionNum].answer,
                        "bg-red-500 text-white":
                          incorrect &&
                          option === answer &&
                          option !==
                            clientSideData?.questions[questionNum].answer,
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
          </div>
        ) : (
          <Result clientSideData={clientSideData} />
        )}
        {!showResult && (
          <button
            onClick={handleSubmitAnswer}
            className="bg-purple w-full font-semibold cursor-pointer text-white py-3.5 px-3 rounded-xl mt-5"
          >
            {`${
              correct || incorrect
                ? "Next Question"
                : !showResult
                ? "Submit Question"
                : "Play Again"
            }`}
          </button>
        )}
        {showResult && (
          <Link href="/" onClick={handlePlayAgain}>
            <button className="bg-purple w-full font-semibold cursor-pointer text-white py-3.5 px-3 rounded-xl mt-5">
              Play Again
            </button>
          </Link>
        )}
        {unselectedError && (
          <div className="flex items-center gap-x-2 justify-center">
            <Image src={iconError} width={22} height={22} alt="error icon" />
            <p className="text-white">Please select an answer</p>
          </div>
        )}
      </div>
    </div>
  );
}
