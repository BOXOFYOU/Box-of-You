export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  isFinished: boolean;
  userAnswers: string[];
  timeRemaining: number;
  status: 'idle' | 'loading' | 'playing' | 'error';
  topic: string;
}

export type QuizAction =
  | { type: 'START_QUIZ'; questions: Question[]; topic: string }
  | { type: 'ANSWER_QUESTION'; answer: string }
  | { type: 'NEXT_QUESTION' }
  | { type: 'TICK' }
  | { type: 'RESTART' }
  | { type: 'SET_ERROR'; error: string };
