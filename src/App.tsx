import React, { useEffect } from 'react';
import axios from 'axios';
import { Center, Spinner, useToast } from '@chakra-ui/react';
import Header from './components/Header';
import StartScreen from './components/StartScreen';
import useStore from './store';
import { constants } from './helper';
import QuizScreen from './components/QuizScreen';
import EndScreen from './components/EndScreen';

function App() {
    const setQuizList = useStore((state) => state.setQuizList);
    const isQuizListLoaded = useStore((state) => state.isQuizListLoaded);
    const currentScreen = useStore((state) => state.currentScreen);

    const toast = useToast();

    useEffect(() => {
        (async () => {
            if (!navigator.onLine)
                return toast({
                    description: 'No active connection',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom',
                });
            try {
                const res = await axios.get(`${constants.baseUrl}/output/list.json`);
                if (Array.isArray(res.data?.quizzes)) return setQuizList(res.data.quizzes);
                return console.log(
                    '%cerror App.tsx: ',
                    'color: red; display: block; width: 100%;',
                    'Quizzes not found',
                );
            } catch (err) {
                return console.log('%cerror App.tsx ', 'color: red; display: block; width: 100%;', err);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header />
            {!isQuizListLoaded ? (
                <Center p="3rem">
                    <Spinner color="#0072b1" thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" />
                </Center>
            ) : (
                <>
                    {currentScreen === 'start' && <StartScreen />}
                    {currentScreen === 'quiz' && <QuizScreen />}
                    {currentScreen === 'end' && <EndScreen />}
                </>
            )}
        </>
    );
}

export default App;
