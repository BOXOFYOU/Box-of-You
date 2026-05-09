import React, { createContext, useContext, useState } from 'react';
import { Scores, calculateResult, mbtiToPersonality } from '../utils/scoring';
import { QUESTIONS } from '../data/questions';

interface QuizContextType {
  currentStep: number;
  answers: Record<number, number>;
  userName: string;
  setAnswer: (questionId: number, value: number) => void;
  setUserName: (name: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetQuiz: () => void;
  getFinalResult: () => { mbti: string; personality: string };
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [userName, setUserName] = useState('');

  const setAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(QUESTIONS.length - 1, prev + 1));
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));
  
  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setUserName('');
  };

  const getFinalResult = () => {
    const finalScores: Scores = { Ni: 0, Ne: 0, Ti: 0, Te: 0, Fi: 0, Fe: 0, Si: 0, Se: 0 };
    
    QUESTIONS.forEach(q => {
      const val = answers[q.id] ?? 0;
      if (q.type === 'likert') {
        // Likert is 1-5, we normalize to -2 to 2
        finalScores[q.fn] += (val - 3);
      } else {
        // Choice is 0 or 4
        finalScores[q.fn] += val;
      }
    });

    const mbti = calculateResult(finalScores);
    const personality = mbtiToPersonality(mbti);
    
    return { mbti, personality };
  };

  return (
    <QuizContext.Provider value={{ 
      currentStep, 
      answers, 
      userName,
      setAnswer, 
      setUserName,
      nextStep, 
      prevStep, 
      resetQuiz, 
      getFinalResult 
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error('useQuiz must be used within QuizProvider');
  return context;
};
