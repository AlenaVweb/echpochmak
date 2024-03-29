import { screenObserver } from "./common/triangle-fall-animation.js";
import { dispatchCompleteEvent } from "./common/general-functions.js";

export const trianglePuzzle = {
    screenId: 'falling-triangle-screen',
    nextScreenId: 'block-catcher-screen',
    hint: 'Нажми на буквы',
    init,
}

function init() {
    animateTriangles();
    initLetterPuzzle();
}

function animateTriangles() {
    const screen = document.getElementById(trianglePuzzle.screenId);
    screenObserver.observe(screen);
}

function initLetterPuzzle() {
    const puzzleTriangles = getPuzzleTriangles();

    for (const puzzleTriangle of puzzleTriangles) {
        puzzleTriangle.onclick = onLetterTriangleClick;
    }
}

function getPuzzleTriangles() {
    return document.getElementById(trianglePuzzle.screenId).getElementsByClassName('puzzle-triangle');
}

function onLetterTriangleClick(event) {
    const element = event.target;

    const letter = element.textContent;
    const tickerLetters = document.getElementById('falling-triangle-ticker').getElementsByClassName('char');

    for (let i = 0; i < tickerLetters.length; i++) {
        const tickerLetter = tickerLetters[i];
        if (letter.toLowerCase() !== tickerLetter.textContent.toLowerCase()) {
            continue;
        }

        if (i % 2 === 0) {
            tickerLetter.classList.add('font-red');
        } else {
            tickerLetter.classList.add('font-blue');
        }
    }

    element.textContent = '';
    element.onclick = null;

    if (isPuzzleCompleted()) {
        dispatchCompleteEvent(trianglePuzzle.screenId);
    }
}

function isPuzzleCompleted() {
    for (const puzzleTriangles of getPuzzleTriangles()) {
        if (isClickable(puzzleTriangles)) {
            return false;
        }
    }

    return true;
}

function isClickable(element) {
    return element.onclick !== null;
}