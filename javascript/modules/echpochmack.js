export const echpochmackScreen = {
    screenId: 'echpochmack-screen',
    init,
};

let scrollProgressBar = 0;

let backgroundChanged = false;
let screenIsDark = false;
const SIZE_MAXIMUM = 8000;
const PATTERN_PASSED = 30000;

function init() {
    document.getElementById(echpochmackScreen.screenId).addEventListener(
        'wheel',
        onEchpochmackWheelScroll,
    )
}

function onEchpochmackWheelScroll(event) {
    event.preventDefault();

    const deltaY = event.deltaY / 5;

    if (!backgroundChanged) {
        changeBackgroundColor(echpochmack);
    } else if (!isScreenDark()) {
        increaseElementSize('echpochmack', deltaY, deltaY * 0.87)
    } else if (!isPatternPassed()) {
        increaseElementSize('echpochmack-pattern', deltaY, deltaY);
    } else if (!isCompleted()) {
        increaseElementSize('echpochmack-pattern', deltaY, deltaY);
        increaseElementFontSize('echpochmack-finish', deltaY / 2);
    } else {
        event.target.removeEventListener(
            'wheel',
            onEchpochmackWheelScroll,
        );
    }
}

function changeBackgroundColor(echpochmack) {
    echpochmack.className = 'triangle';
    echpochmack.style.backgroundColor = '#171717';

    backgroundChanged = true;
}

function increaseElementSize(elementId, widthDelta, heightDelta) {
    const echpochmack = document.getElementById(elementId);
    const styles = getComputedStyle(echpochmack);

    const currentWidth = Math.max(parseInt(styles.width), widthDelta);
    const currentHeight = Math.max(parseInt(styles.height), heightDelta);

    echpochmack.style.width = (currentWidth + currentWidth / widthDelta).toFixed(2) + 'px';
    echpochmack.style.height = (currentHeight + currentHeight / heightDelta).toFixed(2) + 'px';
}

function isScreenDark() {
    const element = document.getElementById('echpochmack');

    const width = parseInt(element.style.width);
    const height = parseInt(element.style.height);

    return isSizeMuchMoreThanWindow(width, height);
}

function isPatternPassed() {
    const element = document.getElementById('echpochmack-pattern');

    const width = parseInt(element.style.width);
    const height = parseInt(element.style.height);

    return isSizeMuchMoreThanWindow(width, height);
}

function isSizeMuchMoreThanWindow(width, height) {
    var viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return width > viewWidth * 4 && height > viewHeight * 4;
}

function increaseElementFontSize(elementId, delta) {
    console.log(delta);
    const element = document.getElementById(elementId);
    const styles = getComputedStyle(element);

    const currentSize = Math.max(parseInt(styles.fontSize), delta);

    element.style.fontSize = currentSize + currentSize / delta + 'px';
}

function isCompleted() {
    const resultElement = document.getElementById('echpochmack-finish');
    const styles = getComputedStyle(resultElement);

    const childElement = resultElement.children[0];
    const childStyles = getComputedStyle(childElement);

    return parseInt(styles.width) <= parseInt(childStyles.width);
}