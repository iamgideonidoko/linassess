import create from 'zustand';

interface QuizInfo {
    name: string;
    fileName: string;
}

export interface Quiz {
    question: string;
    options: string[];
    _ps: number;
}

interface State {
    currentScreen: 'start' | 'end' | 'quiz';
    quizList: QuizInfo[];
    quizzes: Quiz[];
    seletedQuizzes: Quiz[];
    isQuizListLoaded: boolean;
    isQuizzesLoaded: boolean;
    setQuizList: (val: QuizInfo[]) => void;
    setQuizzes: (val: Quiz[]) => void;
    setSelectedQuizzes: (val: Quiz[]) => void;
    setCurrentScreen: (val: 'start' | 'end' | 'quiz') => void;
}

const useStore = create<State>((set) => ({
    currentScreen: 'start',
    quizList: [],
    quizzes: [],
    seletedQuizzes: [],
    isQuizListLoaded: false,
    isQuizzesLoaded: false,
    setQuizList: (val) => set({ quizList: val, isQuizListLoaded: true }),
    setQuizzes: (val) => set({ quizzes: val }),
    setSelectedQuizzes: (val) => set({ quizzes: val }),
    setCurrentScreen: (val) => set({ currentScreen: val }),
}));

export default useStore;
