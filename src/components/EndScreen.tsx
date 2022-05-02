/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { Container, Box, Center, Text, Stack, Button, RadioGroup, Radio } from '@chakra-ui/react';
import { md, sanitizedData } from './QuizScreen';

import useStore from '../store';
import { uuid } from '../helper';

const getStore = (scoreArr: [string, unknown][]) => {
    const score = scoreArr.filter(([, value]) => value).length;
    return score;
};

function EndScreen() {
    const score = useStore((state) => state.score);
    const selectedQuestions = useStore((state) => state.selectedQuestions);
    const scoreArr = Object.entries(score);
    const [viewAnswer, setViewAnswer] = useState(false);
    console.log('score => ', score);
    console.log('selectedQuestions => ', selectedQuestions);

    const handleViewAnswer = () => {
        setViewAnswer(true);
    };

    const handleRetake = () => {};

    const handleTakeAnother = () => {};

    return (
        <Box p="3rem" px="2rem">
            <Container
                w="90%"
                bg="white"
                maxW={viewAnswer ? '1000px' : 'md'}
                shadow="sm"
                p="1rem"
                mt="0rem"
                borderRadius="6px"
            >
                <Center flexDirection="column">
                    <Text fontSize="6xl">😊</Text>
                    <Text>You&apos;ve completed the HTML assessment</Text>
                    <Text>
                        You scored: {getStore(scoreArr)}/{selectedQuestions.length}
                    </Text>
                    <Stack mt="1.4rem">
                        <Button
                            type="submit"
                            h="2rem"
                            px="1rem"
                            pb="3px"
                            borderRadius="10rem"
                            bg="#0072b1"
                            color="white"
                            colorScheme="linkedin"
                            onClick={handleViewAnswer}
                        >
                            View Answers
                        </Button>
                        <Button
                            type="submit"
                            h="2rem"
                            px="1rem"
                            pb="3px"
                            borderRadius="10rem"
                            bg="#0072b1"
                            color="white"
                            colorScheme="linkedin"
                            onClick={handleRetake}
                        >
                            Retake
                        </Button>
                        <Button
                            type="submit"
                            h="2rem"
                            px="1rem"
                            pb="3px"
                            borderRadius="10rem"
                            bg="#0072b1"
                            color="white"
                            colorScheme="linkedin"
                            onClick={handleTakeAnother}
                        >
                            Take another
                        </Button>
                    </Stack>
                </Center>
                <Box pt="2rem">
                    {viewAnswer &&
                        selectedQuestions.map((question) => (
                            <React.Fragment key={uuid()}>
                                <Box shadow="xs" p="1rem 1.5rem">
                                    <div
                                        dangerouslySetInnerHTML={sanitizedData(
                                            md.render(question?.question.substring(4).trim() || ''),
                                        )}
                                    />
                                </Box>
                                <Box shadow="xs" p="1rem 1.5rem">
                                    <RadioGroup defaultValue={`${question._ps}`}>
                                        <Stack>
                                            {question?.options?.map((item, idx) => (
                                                <Radio value={`${idx}`} defaultChecked={question._ps === idx}>
                                                    {' '}
                                                    <div
                                                        dangerouslySetInnerHTML={sanitizedData(md.render(item || ''))}
                                                    />
                                                </Radio>
                                            ))}
                                        </Stack>
                                    </RadioGroup>
                                </Box>
                            </React.Fragment>
                        ))}
                </Box>
            </Container>
        </Box>
    );
}

export default EndScreen;
