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
      className={` grid grid-cols-1 md:grid-cols-2 md:gap-x-[100px]  px-3 pt-6 font-Rubik max-w-[1160px] mx-4 md:mx-auto`}
    >
      <div
        className={clsx({
          "leading-6": showResult,
          "leading-12": !showResult,
        })}
      >
        {!showResult && (
          <p className="mt-1 text-lg italic  dark:text-light-bluish text-grey-navy md:text-[20px]">
            Question {questionNum + 1} of {clientSideData.questions.length}
          </p>
        )}
        {!showResult && (
          <p className="dark:text-white text-text-light min-h-[50px] md:min-h-[100px] mb-5 md:mb-[250px] font-sans text-xl md:text-[36px] flex flex-col">
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
          <div className="flex flex-col gap-y-1.5 md:gap-y-5">
            {clientSideData?.questions[questionNum].options.map((option, i) => (
              <div key={option}>
                <div
                  onClick={() => {
                    setAnswer(option);
                    console.log(option);
                    console.log("EVALUTATE: ", answer === option);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setAnswer(option);
                    }
                  }}
                  tabIndex={0}
                  className={clsx(
                    "flex py-3 md:px-[20px] px-[15px] light-shadow sm:max-w-[800px] max-w-[564px] md:h-[92px] h-[64px] dark:bg-navy light-shadow bg-topicBg-light cursor-pointer md:rounded-3xl rounded-xl items-center justify-between mt-2 gap-x-4 md:gap-x-[14px]",
                    {
                      "border-2 border-green":
                        correct &&
                        option ===
                          clientSideData?.questions[questionNum].answer,

                      "!border-red-500":
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
                        "md:h-[56px] w-[40px] h-[40px] md:w-[56px] leading-4 text-lg md:text-[28px] transition-all rounded-md font-semibold flex justify-center items-center",
                        {
                          "bg-green text-white":
                            correct &&
                            option ===
                              clientSideData?.questions[questionNum].answer,
                          "!bg-purple text-white hover:text-text-light":
                            option === answer && (!correct || !incorrect),
                          "bg-light-grey dark:bg-light-orange  text-text-light":
                            !correct ||
                            option !==
                              clientSideData?.questions[questionNum].answer,
                          "!bg-red-500 text-white":
                            incorrect &&
                            option === answer &&
                            option !==
                              clientSideData?.questions[questionNum].answer,
                        },
                        " hover:text-purple  hover:bg-icon-bgcolor font-bold"
                      )}
                    >
                      {letters[i]}
                    </div>
                    <span className="dark:text-white text-text-light font-sans text-[17px] md:text-[28px]">
                      {option}
                    </span>
                  </div>
                  <Image
                    src={tickIcon}
                    alt="correct-icon"
                    width={30}
                    height={30}
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
                    width={30}
                    height={30}
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
                    width={30}
                    height={30}
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
            className="bg-purple w-full hover:bg-purple-light mb-4 md:text-[28px] text-[18px] transition-all md:h-[92px] h-[56px] font-semibold cursor-pointer text-white px-3 md:rounded-3xl rounded-xl mt-5 md:mt-8"
          >
            {`${
              questionNum === clientSideData.questions.length - 1 &&
              (correct || incorrect)
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
            <p className="dark:text-white text-text-light">
              Please select an answer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
