export function getRandomInteger(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue) ) + minValue; 
}

export function getElementTransform(element) {
    return new DOMMatrix(getComputedStyle(element).transform);
}

export function lockNextScreen(screenId) {
    const nextScreen = document.getElementById(screenId);
    
    nextScreen.style.display = 'none';
    nextScreen.style.visibility = 'hidden';
}

export function unlockNextScreen(screenId) {
    const nextScreen = document.getElementById(screenId);
    
    nextScreen.style.removeProperty('display');
    nextScreen.style.removeProperty('visibility');

    nextScreen.scrollIntoView({
        behavior: 'smooth',
    });
}