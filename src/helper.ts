import { Quiz } from './store';

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

export const randomizeQuiz = (arr: Array<Quiz>) => arr.sort(() => Math.random() - 0.5);
