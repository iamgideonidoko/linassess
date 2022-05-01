import React, { useState } from 'react';
import { Container, FormControl, FormLabel, FormHelperText, Select, Button, Box, useToast } from '@chakra-ui/react';
import axios from 'axios';
import useStore, { Quiz } from '../store';
import { constants, randomizeQuiz } from '../helper';

function StartScreen() {
    const quizList = useStore((state) => state.quizList);
    const setQuizzes = useStore((state) => state.setQuizzes);
    const setSelectedQuizzes = useStore((state) => state.setSelectedQuizzes);
    const setCurrentScreen = useStore((state) => state.setCurrentScreen);
    const [quiz, setQuiz] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const toast = useToast();

    console.log('quiz => ', quiz);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuiz(e.target.value);
    };

    const handleStart = async () => {
        if (!quiz)
            return toast({
                description: 'Select a skill',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            });
        if (!navigator.onLine)
            return toast({
                description: 'No active connection',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            });
        try {
            setLoading(true);
            const res = await axios.get(`${constants.baseUrl}/output/data-prod/${quiz}`);
            setLoading(false);
            if (Array.isArray(res.data)) {
                // eslint-disable-next-line no-underscore-dangle
                const quizzes = res.data.filter((item: Quiz) => item._ps >= 0);
                if (quizzes.length === 0)
                    return toast({
                        description: 'Not available right now',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'bottom',
                    });
                setQuizzes(quizzes);
                setSelectedQuizzes(randomizeQuiz(quizzes).slice(0, 15));
                return setCurrentScreen('quiz');
            }
            return console.log(
                '%cerror StartScreen.tsx: ',
                'color: red; display: block; width: 100%;',
                'Quizzes not found',
            );
        } catch (err) {
            setLoading(false);
            return console.log('%cerror StartScreen.tsx: ', 'color: red; display: block; width: 100%;', err);
        }
    };

    return (
        <Box p="3rem" px="2rem">
            <Container bg="white" maxW="md" shadow="sm" p="1rem" mt="0rem" borderRadius="6px">
                <FormControl>
                    <FormLabel htmlFor="skills">Skill</FormLabel>
                    <Select id="skills" value={quiz} onChange={handleSelect} placeholder="Select skill">
                        {quizList.map((item) => (
                            <option value={item.fileName}>{item.name}</option>
                        ))}
                    </Select>
                    <FormHelperText>You will be given 15 questions (1min &amp; 30secs for each).</FormHelperText>
                    <Box textAlign="right" mt="1rem">
                        {' '}
                        <Button
                            type="submit"
                            h="2rem"
                            px="1rem"
                            pb="3px"
                            borderRadius="10rem"
                            bg="#0072b1"
                            color="white"
                            isLoading={loading}
                            loadingText="Start"
                            colorScheme="linkedin"
                            spinnerPlacement="end"
                            onClick={handleStart}
                        >
                            Start
                        </Button>
                    </Box>
                </FormControl>
            </Container>
        </Box>
    );
}

export default StartScreen;
