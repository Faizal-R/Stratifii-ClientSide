import React from 'react';
import { ChevronRight, Clock } from 'lucide-react';
import { IQuestion } from '@/types/IInterview';

interface QuestionCardProps {
  question: IQuestion;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  timeLeft: number;
  questionNumber: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  timeLeft,
  questionNumber
}) => {
  const options: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-violet-500/20">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <span className="text-white text-xs font-bold">{questionNumber}</span>
          </div>
          <h2 className="text-lg font-semibold text-white">Question {questionNumber}</h2>
        </div>
        <div className={`flex items-center px-2 py-1 rounded-full ${timeLeft <= 10 ? 'bg-red-500/20 text-red-400' : 'bg-violet-500/20 text-violet-400'}`}>
          <Clock className="h-3 w-3 mr-1" />
          <span className="font-medium text-xs">{timeLeft}s</span>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <p className="text-white text-base leading-relaxed">{question.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswerSelect(option)}
            className={`w-full p-3 rounded-lg text-left transition-all duration-200 border-2 ${
              selectedAnswer === option
                ? 'bg-violet-500/20 border-violet-500 text-white'
                : 'bg-black/20 border-gray-600 hover:border-violet-500/50 text-gray-300 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 font-semibold ${selectedAnswer === option ? 'bg-violet-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {option}
              </div>
              <span className="text-inherit">{question.options[option]}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className={`flex items-center px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
            selectedAnswer
              ? 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next Question
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
