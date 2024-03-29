import { spinPuzzle } from "./modules/spin-puzzle.js";
import { trianglePuzzle } from "./modules/falling-triangle-puzzle.js";
import { catcherPuzzle } from "./modules/catcher-puzzle.js";
import { echpochmackScreen } from "./modules/echpochmack.js";

const screens = [
    spinPuzzle,
    trianglePuzzle,
    catcherPuzzle,
    echpochmackScreen,
];

for (const screen of screens) {
    screen.init();
}

function toggleOverlay(action) {
    var overlay = document.getElementById('overlay');
    var content = document.getElementById('overlay-content');

    if (action === 'open') {
        var screenId = document.querySelector('.screen.active')?.id;
        var messages = {
            'spin-puzzle-screen': 'Кликни на круги и собери букву',
            'falling-triangle-screen': 'Нажми на буквы',
            'block-catcher-screen': 'Поймай букву в кольцо'
        };
        
        content.textContent = messages[screenId] || '';
        content.style.display = messages[screenId] ? 'block' : 'none';
        overlay.style.display = 'block';
    } else if (action === 'close') {
        overlay.style.display = 'none';
    }
}

document.getElementById('overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        toggleOverlay('close');
    }
});