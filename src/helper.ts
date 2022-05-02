/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
import { Question } from './store';

type Constant = {
    baseUrl: string;
    baseUrl2: string;
};

export const constants: Constant = {
    baseUrl: 'https://raw.githubusercontent.com/iamgideonidoko/linassess-data-gen/master',
    baseUrl2: 'https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/master',
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

const getFolderName = (fileName: string): string => {
    let folderName = '';
    switch (fileName.replace('.json', '')) {
        case 'c++quiz':
            folderName = 'c++';
            break;
        case 'reactjs-quiz':
            folderName = 'react';
            break;
        case 'search-engine-optimization-quiz':
            folderName = 'seo';
            break;
        case 'object-oriented-programming-quiz':
            folderName = 'oop';
            break;
        case 'linux-assessment':
            folderName = 'linux';
            break;
        case 'gcp-quiz':
            folderName = 'google-cloud-platform';
            break;
        default:
            folderName = fileName;
            break;
    }
    folderName = folderName.replace('-quiz', '').replace('.json', '').toLowerCase();
    return folderName;
};

export const refineHtml = (str: string, fileName: string): string => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = str;
    const imgs = newDiv.querySelectorAll('img');
    const anchors = newDiv.querySelectorAll('a');
    if (imgs) {
        imgs.forEach((img) => {
            const imgSrc = img.src;
            img.src = imgSrc.startsWith(window.location.href)
                ? `${constants.baseUrl2}/${getFolderName(fileName)}${new URL(imgSrc).pathname}`
                : imgSrc;
            img.alt = 'img';
        });
    }
    if (anchors) {
        anchors.forEach((a) => {
            a.href = '#';
            a.innerHTML = '';
        });
    }
    return newDiv.innerHTML;
};
