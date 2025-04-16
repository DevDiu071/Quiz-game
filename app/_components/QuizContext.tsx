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
}

const QuizContext = createContext<QuizContextType | undefined>(undefined); // Provide an empty object as the default value

function QuizeProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState<Quiz>();
  const [clientSideData, setClientSideData] = useState<Quiz | undefined>(
    undefined
  );
  const [correct, setCorrect] = useState<boolean>(false);
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");

  const handleSubmitAnswer = function () {
    setCorrect(false);
    if (clientSideData?.questions[0].answer === answer) {
      setCorrect(true);
      console.log("YESSSS");
    } else console.log("NOOOO");
    setIncorrect(true);
    console.log("clicked...");
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
