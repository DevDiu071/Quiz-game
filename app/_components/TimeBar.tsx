import React, { useEffect } from "react";
import { useQuiz } from "./QuizContext";

export default function TimeBar() {
  const { progress, setProgress, clientSideData, questionNum } = useQuiz();
  useEffect(() => {
    if (clientSideData) {
      const totalQuestions = clientSideData.questions.length;
      const progress = ((questionNum + 1) / totalQuestions) * 100; // Calculate progress percentage
      setProgress(progress); // Update progress
    }
  }, [questionNum, clientSideData, setProgress]);
  return (
    <div className="block relative bg-navy mb-8 h-3 rounded-lg">
      <div
        className={`bg-purple absolute top-1/2 transform -translate-y-1/2 rounded-lg h-2 transition-all duration-500 ease-linear 
        `}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
