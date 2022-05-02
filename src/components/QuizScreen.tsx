import React, { useEffect, useState } from 'react';
import { Box, Center, Flex, Button } from '@chakra-ui/react';
import { startTimer } from '../helper';

function Timer({ time }: { time: number | string }) {
    const [timer, setTimer] = useState<string>('00:00');

    useEffect(() => {
        startTimer(Number(time.toString()) * 60, setTimer);
    }, [time]);

    return <span>{timer}</span>;
}

function QuizScreen() {
    const [time, setTime] = useState<number | string>(0);

    const handleNext = () => {
        console.log('love');
        setTime(typeof time === 'string' ? 0.1 : '0.1');
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
                Question
            </Box>
            <Box shadow="xs" p="1rem 1.5rem">
                Option
            </Box>
            <Box bg="#DBD9DB" width="100%" mt="0.5rem">
                <Box bg="#58677F" w="50%" h="0.8rem" transition="width ease 0.3s" />
            </Box>
            <Flex justifyContent="space-between" alignItems="center" p="1rem 1.5rem" shadow="xs" mt="0.5rem">
                <Box>
                    Q4/15 &nbsp;&nbsp; <Timer time={time} />
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
                        disabled={false}
                    >
                        Next
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
}

export default QuizScreen;
