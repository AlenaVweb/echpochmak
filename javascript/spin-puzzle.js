import { getElementTransform, getRandomInteger, lockNextScreen, unlockNextScreen } from "./general-functions.js";

const spinRotationStep = 45;
const nextScreen = 'falling-triangle-screen';

function getPuzzleCircleElements() {
    return document.getElementsByClassName('puzzle-circle-letter');
}

function init() {
    for (let puzzleCircleElement of getPuzzleCircleElements()) {
        initPuzzleCircle(puzzleCircleElement);
        puzzleCircleElement.onclick = spinPuzzleCircle;
    }

    lockNextScreen(nextScreen);
}

function initPuzzleCircle(element) {
    const initialTransform = getElementTransform(element);
    
    const randomRotation = getRandomInteger(1, 7) * spinRotationStep;
    element.style.transform = initialTransform.rotate(randomRotation);
}

function spinPuzzleCircle(event) {
    const currentTransform = getElementTransform(event.target);

    const frameStep = spinRotationStep / 10;
    let currentStep = 0;

    function animate() {
        currentStep += frameStep;
        event.target.style.transform = currentTransform.rotate(currentStep);

        if (currentStep !== spinRotationStep) {
            return requestAnimationFrame(animate);
        }

        if (isPuzzleCircleCompleted(event.target)) {
            lockSpinning(event.target);
        }

        if (isPuzzleCompleted()) {
            unlockNextScreen(nextScreen);
        }
    }

    requestAnimationFrame(animate);
}

function isPuzzleCircleCompleted(element) {
    const elementTransform = getElementTransform(element);

    const cosX = elementTransform.a;
    const sinX = elementTransform.b;
    
    let currentAngle = Math.round(Math.atan2(sinX, cosX) * (180/Math.PI));
    currentAngle = currentAngle < 0 ? currentAngle + 360 : currentAngle;

    return currentAngle === 0;
}

function lockSpinning(element) {
    element.style.animationName = 'complete-spin-puzzle-circle';
    element.style.animationDuration = '0.5s';
    element.style.animationFillMode = 'forwards';
    element.style.animationTimingFunction = 'linear';

    element.onclick = null;
}

function isPuzzleCompleted() {
    for (const puzzleCircleElement of getPuzzleCircleElements()) {
        if (puzzleCircleElement.onclick !== null) {
            return false;
        }
    }

    return true;
}

init();