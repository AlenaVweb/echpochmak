import { dispatchCompleteEvent } from "./common/general-functions.js";

export const catcherPuzzle = {
    screenId: 'block-catcher-screen',
    nextScreenId: 'echpochmack-screen',
    hint: 'Поймай букву в кольцо',
    init,
};

function init() {
    addMouseHoverCircle();
    initCatcherPuzzle();
}

function addMouseHoverCircle() {
    const screenElement = document.getElementById(catcherPuzzle.screenId);
    const mouseCircleElement = document.getElementById('mouse-circle');

    const showMouseCircle = event => {
        const circleStyles = getComputedStyle(mouseCircleElement);

        mouseCircleElement.style.display = 'block';

        const borderHeight = parseInt(circleStyles.borderBottomWidth) + parseInt(circleStyles.borderTopWidth);
        const heightOffset = (parseInt(circleStyles.height) + borderHeight) / 2;
        mouseCircleElement.style.top = (event.clientY - heightOffset) + 'px';

        const borderWidth = parseInt(circleStyles.borderLeftWidth) + parseInt(circleStyles.borderRightWidth);
        const widthOffset = (parseInt(circleStyles.width) + borderWidth) / 2;
        mouseCircleElement.style.left = (event.clientX - widthOffset) + 'px';
    };

    const hideMouseCircle = event => {
        mouseCircleElement.style.display = 'none';
    };

    screenElement.addEventListener('mousemove', showMouseCircle);
    screenElement.addEventListener('touchstart', (event) =>showMouseCircle(event.touches[0]));

    screenElement.addEventListener('mouseout', hideMouseCircle);
    screenElement.addEventListener('touchend', hideMouseCircle);
}

function initCatcherPuzzle() {
    for (const hiddenLetter of getTickerAllHiddenLetters()) {
        hiddenLetter.style.display = 'none';
    }

    for (const letter of getLetters()) {
        letter.addEventListener('click', onLetterClick);
    }
}

function getLetters() {
    return document.getElementById(catcherPuzzle.screenId).getElementsByClassName('block-catcher-letter');
}

function onLetterClick(event) {
    event.stopPropagation();

    const letterElement = event.target.parentElement;

    const letterClasses = letterElement.className.split(' ');
    let className = '';

    if (letterClasses.includes('letter-A')) {
        className = 'ticker-letter-A';
    } else if (letterClasses.includes('letter-K')) {
        className = 'ticker-letter-K';
    } else {
        return;
    }

    for (const hiddenLetter of getTickerConcreteHiddenLetters(className)) {
        hiddenLetter.style.display = 'inline';
    }

    letterElement.removeEventListener('click', onLetterClick);
    letterElement.style.display = 'none';

    if (isPuzzleSolved()) {
        dispatchCompleteEvent(catcherPuzzle.screenId);
    }
}

function getTickerAllHiddenLetters() {
    return document.getElementById(catcherPuzzle.screenId).getElementsByClassName('hidden-letter');
}

function getTickerConcreteHiddenLetters(className) {
    return document.getElementById(catcherPuzzle.screenId).getElementsByClassName(className);
}

function isPuzzleSolved() {
    for (const letterElement of getLetters()) {
        if (letterElement.style.display !== 'none') {
            return false;
        }
    }

    return true;
}
