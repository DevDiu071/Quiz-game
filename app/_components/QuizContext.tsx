"use client";

import {
  ReactNode,
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Quiz } from "../_lib/types";

interface QuizContextType {
  topic: Quiz | undefined;
  setTopic: (quiz: Quiz) => void;
  clientSideData: Quiz | undefined;
  setClientSideData: Dispatch<SetStateAction<Quiz | undefined>>;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
  handleSubmitAnswer: () => void;
  setCorrect: Dispatch<SetStateAction<boolean>>;
  correct: boolean;
  setIncorrect: Dispatch<SetStateAction<boolean>>;
  incorrect: boolean;
  setUnselectedError: Dispatch<SetStateAction<boolean>>;
  unselectedError: boolean;
  setQuestionNum: Dispatch<SetStateAction<number>>;
  questionNum: number;
  setShowResult: Dispatch<SetStateAction<boolean>>;
  showResult: boolean;
  score: number;
  handlePlayAgain: () => void;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  timeupAndUpdate: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined); // Provide an empty object as the default value

function QuizeProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState<Quiz>();
  const [clientSideData, setClientSideData] = useState<Quiz | undefined>(
    undefined
  );
  const [progress, setProgress] = useState(100); // Start at 100% progress
  const [correct, setCorrect] = useState<boolean>(false);
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [unselectedError, setUnselectedError] = useState<boolean>(false);
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const timeupAndUpdate = function () {
    if (progress === 0) {
      if (questionNum < 9) {
        setQuestionNum((num) => num + 1);
        setCorrect(false);
        setIncorrect(false);
        setAnswer("");
      } else {
        setCorrect(false);
        setIncorrect(false);
        setShowResult(true);
      }
    }
  };

  const handleSubmitAnswer = function () {
    setCorrect(false);
    if (answer) {
      if (clientSideData?.questions[questionNum].answer === answer) {
        setCorrect(true);
        setUnselectedError(false);
        console.log("YESSSS");
      } else console.log("NOOOO");
      setIncorrect(true);
      console.log("clicked...");
      setUnselectedError(false);
    } else {
      setUnselectedError(true);
    }

    if (correct) setScore((score) => score + 1);

    if (correct || incorrect) {
      if (questionNum < 9) {
        setQuestionNum((num) => num + 1);
        setCorrect(false);
        setIncorrect(false);
        setAnswer("");
      } else {
        setCorrect(false);
        setIncorrect(false);
        setShowResult(true);
      }
    }
  };

  const handlePlayAgain = function () {
    setClientSideData(undefined);
    setTimeout(() => {
      setCorrect(false);
      setIncorrect(false);
      setAnswer("");
      setShowResult(false);
      setScore(0);
      setQuestionNum(0); // Reset to the first question
    }, 1000); // Delay of 1 second (1000 milliseconds)
  };

  return (
    <QuizContext.Provider
      value={{
        topic,
        setTopic,
        clientSideData,
        setClientSideData,
        answer,
        setAnswer,
        handleSubmitAnswer,
        correct,
        setCorrect,
        setIncorrect,
        incorrect,
        setUnselectedError,
        unselectedError,
        questionNum,
        setQuestionNum,
        showResult,
        setShowResult,
        score,
        handlePlayAgain,
        progress,
        setProgress,
        timeupAndUpdate,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("Context was used outside provider");

  return context;
}

export { QuizeProvider, useQuiz };
