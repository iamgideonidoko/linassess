import create from 'zustand';

interface QuizInfo {
    name: string;
    fileName: string;
}

export interface Question {
    question: string;
    options: string[];
    _ps: number;
}

interface State {
    currentScreen: 'start' | 'end' | 'quiz';
    currentQuizInfo: QuizInfo | null;
    quizList: QuizInfo[];
    questions: Question[];
    selectedQuestions: Question[];
    isQuizListLoaded: boolean;
    isQuizzesLoaded: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    score: any;
    setQuizList: (val: QuizInfo[]) => void;
    setQuestions: (val: Question[]) => void;
    setSelectedQuestions: (val: Question[]) => void;
    setCurrentQuizInfo: (val: QuizInfo) => void;
    setCurrentScreen: (val: 'start' | 'end' | 'quiz') => void;
    setScore: (val: unknown) => void;
}

const useStore = create<State>((set) => ({
    currentScreen: 'start',
    currentQuizInfo: null,
    quizList: [],
    questions: [],
    selectedQuestions: [],
    isQuizListLoaded: false,
    isQuizzesLoaded: false,
    score: {},
    setQuizList: (val) => set({ quizList: val, isQuizListLoaded: true }),
    setQuestions: (val) => set({ questions: val }),
    setSelectedQuestions: (val) => set({ selectedQuestions: val }),
    setCurrentQuizInfo: (val) => set({ currentQuizInfo: val }),
    setCurrentScreen: (val) => set({ currentScreen: val }),
    setScore: (val) => set({ score: val }),
}));

export default useStore;
