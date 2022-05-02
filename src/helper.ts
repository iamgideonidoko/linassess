/* eslint-disable no-bitwise */
import { Question } from './store';

/* function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
}; */

type Constant = {
    baseUrl: string;
};

export const constants: Constant = {
    baseUrl: 'https://raw.githubusercontent.com/iamgideonidoko/linassess-data-gen/master',
};

export const randomizeQuestions = (arr: Array<Question>) => arr.sort(() => Math.random() - 0.5);

let intervalId: number;

export function startTimer(
    duration: number,
    display: React.Dispatch<React.SetStateAction<string>>,
    handleNext: () => void,
) {
    let timer = duration;
    let minutes;
    let seconds;
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        minutes = parseInt(`${timer / 60}`, 10);
        seconds = parseInt(`${timer % 60}`, 10);

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        display(`${minutes}:${seconds}`);

        // eslint-disable-next-line no-plusplus
        if (--timer < 0) {
            timer = 0;
            if (intervalId) clearInterval(intervalId);
            handleNext();
        }
    }, 1000);
}

export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
