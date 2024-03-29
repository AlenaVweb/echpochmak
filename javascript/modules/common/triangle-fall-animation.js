const fallingObjectsAnimations = {};

export const screenObserver = new IntersectionObserver(
    (entries, observer) => entries.forEach(animateTriangles),
    { threshold: 1 }
)

function animateTriangles(screenObserverEntry) {
    const screenId = screenObserverEntry.target.id;

    for (const triangle of getTriangles(screenId)) {
        if (screenObserverEntry.isIntersecting) {
            fallAnimation(triangle);
        } else {
            cancelFallAnimation(triangle);
        }
    }
}

function getTriangles(screenId) {
    return document.getElementById(screenId).getElementsByClassName('triangle');
}

function fallAnimation(element) {
    let elementPositionTop = parseInt(getComputedStyle(element).top);

    let speed = 1;

    if (element.getAttribute('fall-speed')) {
        speed = parseInt(element.getAttribute('fall-speed'));
    }

    const animationCallback = () => {
        if (!isFallenOffScreen(element)) {
            elementPositionTop += speed;
            setPositionTop(element, elementPositionTop);
        } else {
            elementPositionTop = getHighestTopPosition(element);
            element.style.top = setPositionTop(element, elementPositionTop);
        }

        fallingObjectsAnimations[element.id] = requestAnimationFrame(animationCallback);
    };

    fallingObjectsAnimations[element.id] = requestAnimationFrame(animationCallback);
}

function isFallenOffScreen(element) {
    var elementViewRect = element.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return elementViewRect.top - viewHeight > 0;
}

function cancelFallAnimation(element) {
    cancelAnimationFrame(fallingObjectsAnimations[element.id]);
}

function setPositionTop(element, value) {
    element.style.top = value + "px";
}

function getHighestTopPosition(element) {
    // if element is rotated, max height for user is diagonal length
    return -calculateElementDiagonalLength(element);
}

function calculateElementDiagonalLength(element) {
    const styles = getComputedStyle(element);

    const width = parseInt(styles.width);
    const height = parseInt(styles.height);

    return Math.sqrt(width ** 2 + height ** 2);
}