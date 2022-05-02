/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Box, Center, Flex, Button, Stack, RadioGroup, Radio } from '@chakra-ui/react';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import { startTimer } from '../helper';
import useStore from '../store';

function Timer({ time }: { time: number | string }) {
    const [timer, setTimer] = useState<string>('00:00');

    useEffect(() => {
        startTimer(Number(time.toString()) * 60, setTimer);
    }, [time]);

    return <span>{timer}</span>;
}

function QuizScreen() {
    const [time, setTime] = useState<number | string>(0);
    const selectedQuestions = useStore((state) => state.selectedQuestions);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [currentOption, setCurrentOption] = useState<number | undefined>(undefined);
    const score = useStore((state) => state.score);
    const setScore = useStore((state) => state.setScore);
    const setCurrentScreen = useStore((state) => state.setCurrentScreen);

    const question = selectedQuestions[currentQuestion];

    const md = new MarkdownIt();

    const sanitizedData = (data: string) => ({
        __html: DOMPurify.sanitize(data),
    });

    console.log('currentOption => ', currentOption);

    const handleNext = () => {
        if (selectedQuestions.length === Number(currentQuestion) + 1) return setCurrentScreen('end');
        console.log('love');
        setScore({ ...score, [currentQuestion]: currentOption === question._ps });
        setCurrentQuestion((prev) => prev + 1);
        setCurrentOption(undefined);
        return setTime(typeof time === 'string' ? 0.1 : '0.1');
    };

    const handleOptionChange = (nextValue: string) => {
        setCurrentOption(Number(nextValue));
    };

    return (
        <Box
            background="white"
            my="3rem"
            w="90%"
            mx="auto"
            maxW="1000px"
            shadow="xs"
            borderRadius="6px"
            overflow="hidden"
        >
            <Center bg="#676667" color="white" py="1rem" px="0.5rem" fontWeight="600" fontSize="20px">
                HTML Assessment
            </Center>
            <Box shadow="xs" p="1rem 1.5rem">
                <div dangerouslySetInnerHTML={sanitizedData(md.render(question?.question || ''))} />
            </Box>
            <Box shadow="xs" p="1rem 1.5rem">
                <RadioGroup value={currentOption} onChange={handleOptionChange}>
                    <Stack>
                        {question?.options?.map((item, idx) => (
                            <Radio value={idx}>
                                {' '}
                                <div dangerouslySetInnerHTML={sanitizedData(md.render(item || ''))} />
                            </Radio>
                        ))}
                    </Stack>
                </RadioGroup>
            </Box>
            <Box bg="#DBD9DB" width="100%" mt="0.5rem">
                <Box
                    bg="#58677F"
                    w={`${((currentQuestion + 1) / selectedQuestions.length) * 100}%`}
                    h="0.8rem"
                    transition="width ease 0.3s"
                />
            </Box>
            <Flex justifyContent="space-between" alignItems="center" p="1rem 1.5rem" shadow="xs" mt="0.5rem">
                <Box>
                    Q{currentQuestion + 1}/{selectedQuestions.length} &nbsp;&nbsp; <Timer time={time} />
                </Box>
                <Box>
                    <Button
                        type="submit"
                        h="2rem"
                        px="1rem"
                        pb="3px"
                        borderRadius="10rem"
                        bg="#0072b1"
                        color="white"
                        colorScheme="linkedin"
                        onClick={handleNext}
                        disabled={!currentOption && currentOption !== 0 && true}
                    >
                        Next
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
}

export default QuizScreen;
