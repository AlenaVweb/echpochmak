import { spinPuzzle } from "./modules/spin-puzzle.js";
import { trianglePuzzle } from "./modules/falling-triangle-puzzle.js";
import { catcherPuzzle } from "./modules/catcher-puzzle.js";
import { echpochmackScreen } from "./modules/echpochmack.js";
import { lockScreen, unlockScreen } from "./modules/common/general-functions.js";

init();
initHints();

function init() {
    const interactiveScreens = [
        spinPuzzle,
        trianglePuzzle,
        catcherPuzzle,
        echpochmackScreen,
    ];

    for (const screen of interactiveScreens) {
        screen.init();

        if (screen.nextScreenId) {
            lockScreen(screen.nextScreenId);
        }
    }

    document.addEventListener(
        'puzzleCompleted',
        event => {
            const screen = interactiveScreens.find(
                screen => screen.screenId === event.detail.id,
            );

            unlockScreen(screen.nextScreenId);
        },
    )
}

function initHints() {
    const screens = {
        'intro-screen': { hint: 'Крути' },
        [spinPuzzle.screenId]: spinPuzzle,
        [trianglePuzzle.screenId]: trianglePuzzle,
        [catcherPuzzle.screenId]: catcherPuzzle,
        [echpochmackScreen.screenId]: echpochmackScreen,
    }

    const screenObserver = new IntersectionObserver(
        (entries, observer) => entries.forEach(
            entry => resolveHint(entry),
        ),
        { threshold: 1 },
    )

    for (const screenId in screens) {
        screenObserver.observe(document.getElementById(screenId));
    }

    document.getElementById('tip-button').addEventListener(
        'click',
        event => {
            !isHintVisible() ? showHint() : hideHint();
        }
    );

    function isHintVisible() {
        const hintBlock = document.getElementById('overlay');
        return hintBlock.style.display === 'block';
    }

    function showHint() {
        document.getElementById('overlay').style.display = 'block';
    }

    function hideHint() {
        document.getElementById('overlay').style.display = 'none';
    }

    function resolveHint(observerEntry) {
        if (!observerEntry.isIntersecting) {
            return;
        }

        const hintText = screens[observerEntry.target.id].hint ?? '';
        document.getElementById('overlay-content').textContent = hintText;
    }
}