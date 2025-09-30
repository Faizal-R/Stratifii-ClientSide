import React, { useState, useEffect, useMemo } from "react";
import { Clock, ArrowLeft } from "lucide-react";
import QuestionCard from "./QuestionsCard";
import ResultsScreen from "./ResultScreen";
import { IQuestion } from "@/types/IInterview";

interface MockInterviewProps {
  onBackToDashboard: () => void;
  questions: IQuestion[];
  delegationId: string;
  submitMockResultAndUpdateStatus: (
    delegationId: string,
    resultData: {
      percentage: number;
      correct: number;
      total: number;
    }
  ) => void;
}

const MockInterview: React.FC<MockInterviewProps> = ({
  onBackToDashboard,
  questions,
  delegationId,
  submitMockResultAndUpdateStatus,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(40);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  // ✅ Calculate score once and reuse
  const score = useMemo(() => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correct++;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100),
    };
  }, [answers, questions]);

  // ✅ Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 40;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  
  useEffect(() => {
    if (showResults) {
      submitMockResultAndUpdateStatus(delegationId, score);
    }
  }, [showResults]);

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(40);
    } else {
      setShowResults(true);
    }
  };

  
  if (showResults) {
    return (
      <ResultsScreen
        score={score}
        onBackToDashboard={onBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToDashboard}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="flex items-center space-x-4">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-violet-500/20">
              <span className="text-gray-400">Question </span>
              <span className="text-white font-semibold">
                {currentQuestionIndex + 1} / {totalQuestions}
              </span>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-violet-500/20 flex items-center">
              <Clock className="h-4 w-4 text-violet-400 mr-2" />
              <span
                className={`font-semibold ${
                  timeLeft <= 10 ? "text-red-400" : "text-white"
                }`}
              >
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-black/40 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                }%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>Progress</span>
            <span>
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNextQuestion}
          timeLeft={timeLeft}
          questionNumber={currentQuestionIndex + 1}
        />
      </div>
    </div>
  );
};

export default MockInterview;
