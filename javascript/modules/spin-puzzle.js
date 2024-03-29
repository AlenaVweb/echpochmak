import {
    getElementTransform,
    getRandomInteger,
    dispatchCompleteEvent
} from "./common/general-functions.js";
import { screenObserver } from "./common/triangle-fall-animation.js";

export const spinPuzzle = {
    screenId: 'spin-puzzle-screen',
    nextScreenId: 'falling-triangle-screen',
    hint: 'Кликни на круги и собери букву',
    init,
}

const spinRotationStep = 45;

function init() {
    animateTriangles();

    for (let puzzleCircleElement of getPuzzleCircleElements()) {
        initPuzzleCircle(puzzleCircleElement);
        unlockSpinning(puzzleCircleElement);
    }
}

function animateTriangles() {
    const screen = document.getElementById(spinPuzzle.screenId);
    screenObserver.observe(screen);
}

function getPuzzleCircleElements() {
    return document.getElementsByClassName('puzzle-circle-letter');
}

function initPuzzleCircle(element) {
    const initialTransform = getElementTransform(element);

    const randomRotation = getRandomInteger(1, 7) * spinRotationStep;
    element.style.transform = initialTransform.rotate(randomRotation);
}

function spinPuzzleCircle(event) {
    const element = event.target;

    const currentTransform = getElementTransform(element);

    const frameStep = spinRotationStep / 15;
    let currentStep = 0;

    lockSpinning(element);

    function animate() {
        currentStep += frameStep;
        event.target.style.transform = currentTransform.rotate(currentStep);

        if (currentStep !== spinRotationStep) {
            return requestAnimationFrame(animate);
        }

        if (!isPuzzleCircleCompleted(element)) {
            unlockSpinning(element);

            return;
        }

        playCircleCompleteAnimation(element);

        if (isPuzzleCompleted()) {
            dispatchCompleteEvent(spinPuzzle.screenId);
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

function playCircleCompleteAnimation(element) {
    element.style.animationName = 'complete-spin-puzzle-circle';
    element.style.animationDuration = '0.5s';
    element.style.animationFillMode = 'forwards';
    element.style.animationTimingFunction = 'linear';
}

function canSpin(circleElement) {
    return circleElement.onclick !== null;
}

function lockSpinning(circleElement) {
    circleElement.onclick = null;
}

function unlockSpinning(circleElement) {
    circleElement.onclick = spinPuzzleCircle;
}

function isPuzzleCompleted() {
    for (const puzzleCircleElement of getPuzzleCircleElements()) {
        if (canSpin(puzzleCircleElement)) {
            return false;
        }
    }

    return true;
}