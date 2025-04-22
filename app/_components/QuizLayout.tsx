"use client";

import React, { useEffect } from "react";
import { useQuiz } from "./QuizContext";
import { useLocalStorage } from "./UseLocalStorage";
import iconError from "@/public/assets/images/icon-error.svg";
import Image from "next/image";
import clsx from "clsx";
import Result from "./Result";
import Link from "next/link";

import tickIcon from "@/public/assets/images/icon-correct.svg";
import xIcon from "@/public/assets/images/icon-incorrect.svg";
import TimeBar from "./TimeBar";

export default function QuizLayout() {
  const { getItem } = useLocalStorage("value");
  const {
    clientSideData,
    setClientSideData,
    setAnswer,
    answer,

    correct,
    setCorrect,
    incorrect,
    setIncorrect,
    unselectedError,
    questionNum,
    showResult,
    handlePlayAgain,
    handleSubmitAnswer,
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
      className={` grid grid-cols-1 md:grid-cols-2 md:gap-x-[100px]  px-3 pt-6 font-Rubik max-w-[900px] mx-4 md:mx-auto`}
    >
      <div
        className={clsx({
          "leading-6": showResult,
          "leading-12": !showResult,
        })}
      >
        {!showResult && (
          <p className="mt-1 text-lg italic  dark:text-light-bluish text-grey-navy">
            Question {questionNum + 1} of {clientSideData.questions.length}
          </p>
        )}
        {!showResult && (
          <p className="dark:text-white text-text-light min-h-[50px] md:min-h-[100px] mb-5 md:mb-[150px] font-sans text-xl md:text-3xl flex flex-col">
            {clientSideData?.questions[questionNum].question}
          </p>
        )}
        {showResult && (
          <div className="mb-[50px] md:mb-[150px] text-[40px] leading-11 md:text-[40px] dark:text-white text-text-light">
            <p>Quiz Completed</p>
            <p className="font-bold">You Scored...</p>
          </div>
        )}
        {!showResult && <TimeBar />}
      </div>
      <div>
        {!showResult ? (
          <div className="flex flex-col gap-y-1.5">
            {clientSideData?.questions[questionNum].options.map((option, i) => (
              <div key={option}>
                <div
                  onClick={() => {
                    setAnswer(option);
                    console.log(option);
                    console.log("EVALUTATE: ", answer === option);
                  }}
                  className={clsx(
                    "flex px-2 py-3 dark:bg-navy bg-topicBg-light h-15 cursor-pointer rounded-xl items-center justify-between mt-2 gap-x-4",
                    {
                      "border-2 border-green":
                        correct &&
                        option ===
                          clientSideData?.questions[questionNum].answer,

                      "border-red-500":
                        incorrect &&
                        option === answer &&
                        option !==
                          clientSideData?.questions[questionNum].answer,
                      "border-2 border-blue-600":
                        option === answer && !correct && !incorrect,
                      "border-2 !border-purple":
                        option === answer && (!correct || !incorrect),
                      "border-2 border-topicBg-light dark:border-navy":
                        !correct ||
                        answer !==
                          clientSideData?.questions[questionNum].answer,
                    }
                  )}
                >
                  <div className="flex gap-x-4 items-center">
                    <div
                      className={clsx(
                        "h-9 w-9 leading-4 transition-all rounded-md font-semibold flex justify-center items-center",
                        {
                          "bg-green text-white":
                            correct &&
                            option ===
                              clientSideData?.questions[questionNum].answer,
                          "!bg-purple text-white":
                            option === answer && (!correct || !incorrect),
                          "bg-light-grey dark:bg-light-orange  text-text-light":
                            !correct ||
                            option !==
                              clientSideData?.questions[questionNum].answer,
                          "bg-red-500 text-white":
                            incorrect &&
                            option === answer &&
                            option !==
                              clientSideData?.questions[questionNum].answer,
                        },
                        " hover:text-purple  hover:bg-purple-lighter font-bold"
                      )}
                    >
                      {letters[i]}
                    </div>
                    <span className="dark:text-white text-text-light font-sans font-bold text-lg">
                      {option}
                    </span>
                  </div>
                  <Image
                    src={tickIcon}
                    alt="correct-icon"
                    width={25}
                    height={25}
                    className={clsx({
                      block:
                        correct &&
                        answer ===
                          clientSideData?.questions[questionNum].answer,
                      hidden:
                        !correct ||
                        option !==
                          clientSideData?.questions[questionNum].answer,
                    })}
                  />
                  <Image
                    src={tickIcon}
                    alt="correct-icon"
                    width={25}
                    height={25}
                    className={clsx({
                      block:
                        !correct ||
                        option !==
                          clientSideData?.questions[questionNum].answer,
                      hidden:
                        correct ||
                        !incorrect ||
                        option !==
                          clientSideData?.questions[questionNum].answer,
                    })}
                  />

                  <Image
                    src={xIcon}
                    alt="correct-icon"
                    width={25}
                    height={25}
                    className={clsx({
                      block:
                        incorrect &&
                        answer !== "" &&
                        option === answer &&
                        option !==
                          clientSideData?.questions[questionNum].answer,
                      hidden:
                        !incorrect ||
                        answer === "" ||
                        option !== answer ||
                        option ===
                          clientSideData?.questions[questionNum].answer,
                    })}
                  />
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
            className="bg-purple w-full hover:bg-purple-light transition-all font-semibold cursor-pointer text-white py-3.5 px-3 rounded-xl mt-5"
          >
            {`${
              (questionNum === clientSideData.questions.length - 1 &&
                !showResult &&
                correct) ||
              incorrect
                ? "Show Result"
                : correct || incorrect
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
          <div className="flex items-center gap-x-2 mt-2 justify-center">
            <Image src={iconError} width={22} height={22} alt="error icon" />
            <p className="text-white">Please select an answer</p>
          </div>
        )}
      </div>
    </div>
  );
}
