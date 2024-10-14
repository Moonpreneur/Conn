const firstPage = document.getElementById('first-page');
const instructionsPage = document.getElementById('instructions-page');
const gamePage = document.getElementById('main-container');
const howToPlayBtn = document.getElementById('how-to-play-btn');
const startGameBtn = document.getElementById('start-game-btn');
const resetBtn = document.getElementById('reset-btn');
const gameoverContainer = document.getElementById('gameover-container');
const gameoverMessage = document.getElementById('gameover-message');

// Sounds for players and game over
const player1Sound = new Audio('green.mp3'); 
const player2Sound = new Audio('tap.mp3'); 
const gameoverSound = new Audio('celebration.mp3'); // New sound for game over

window.addEventListener('load', () => {
    firstPage.style.display = 'block'; 
    instructionsPage.style.display = 'none';
    gamePage.style.display = 'none';
    gameoverContainer.style.display = 'none';
});

howToPlayBtn.addEventListener('click', () => {
    firstPage.style.display = 'none';
    instructionsPage.style.display = 'flex';
});

startGameBtn.addEventListener('click', () => {
    instructionsPage.style.display = 'none';
    gamePage.style.display = 'flex';
    gameoverContainer.style.display = 'none'; 
});

resetBtn.addEventListener('click', () => {
    gamePage.style.display = 'none';
    firstPage.style.display = 'block';
    gameoverContainer.style.display = 'none';
    resetBoard(); 
});

var buttons = document.getElementsByClassName("btn");
var playerType = document.getElementById("player-type");
var playerNumber = 1; 
var filledGrid = []; 
var filledCells = 0;

for (var i = 0; i < 6; i++) {
    var arr = [-1, -1, -1, -1, -1, -1, -1];
    filledGrid.push(arr);
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var buttonNo = this.classList[1];
        makeMove(this, buttonNo.slice(4));
    });
}

function makeMove(button, buttonNo) {
    var row = buttonNo % 7 === 0 ? Math.floor(buttonNo / 7) - 1 : Math.floor(buttonNo / 7);
    var col = buttonNo % 7 === 0 ? 6 : (buttonNo % 7) - 1;

    if (playerNumber === 1) {
        button.classList.add("btn-player-1");
        filledGrid[row][col] = 1;
        filledCells++;

        player1Sound.play();

        if (playerWon(row, col, 1) === true) {
            setTimeout(function () {
                showGameOverMessage("🥳🥳🥳🥳Red Wins! Congratulations Player 1!🥳🥳🥳🥳");
                gameoverSound.play(); // Play game over sound
                resetAfterGameOver();
            }, 200);
        } else {
            playerNumber = 2;
            playerType.textContent = "Player - 2";
        }
    } else {
        button.classList.add("btn-player-2");
        filledGrid[row][col] = 2;
        filledCells++;

        player2Sound.play();

        if (playerWon(row, col, 2) === true) {
            setTimeout(function () {
                showGameOverMessage("🥳🥳🥳🥳Yellow Wins! Congratulations Player 2!🥳🥳🥳🥳");
                gameoverSound.play(); // Play game over sound
                resetAfterGameOver();
            }, 200);
        } else {
            playerNumber = 1;
            playerType.textContent = "Player - 1";
        }
    }

    if (filledCells === 42 && !playerWon(row, col, 1) && !playerWon(row, col, 2)) {
        setTimeout(function () {
            showGameOverMessage("Game Draw! Well played!");
            gameoverSound.play(); // Play game over sound for a draw as well
            resetAfterGameOver();
        }, 200);
    }

    setTimeout(function () {
        button.disabled = true;
    }, 10);
}

function playerWon(row, col, player) {
    var count = 0;

    for (var i = 0; i < 7; i++) {
        if (filledGrid[row][i] === player) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }

    count = 0;

    for (var i = 0; i < 6; i++) {
        if (filledGrid[i][col] === player) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }

    count = 0;

    if (row >= col) {
        var i = row - col;
        var j = 0;
        for (; i <= 5; i++, j++) {
            if (filledGrid[i][j] === player) {
                count++;
                if (count == 4) return true;
            } else {
                count = 0;
            }
        }
    } else {
        var i = 0;
        var j = col - row;
        for (; j <= 6; i++, j++) {
            if (filledGrid[i][j] === player) {
                count++;
                if (count == 4) return true;
            } else {
                count = 0;
            }
        }
    }

    count = 0;

    if (row + col <= 5) {
        var i = row + col;
        var j = 0;
        for (; i >= 0 && j <= row + col; i--, j++) {
            if (filledGrid[i][j] === player) {
                count++;
                if (count == 4) return true;
            } else {
                count = 0;
            }
        }
    } else {
        var i = 5;
        var j = row + col - 5;
        for (; j <= 6; j++, i--) {
            if (filledGrid[i][j] === player) {
                count++;
                if (count == 4) return true;
            } else {
                count = 0;
            }
        }
    }
    return false;
}

function showGameOverMessage(message) {
    gameoverMessage.textContent = message;
    gameoverContainer.style.display = 'block';
}

function resetAfterGameOver() {
    setTimeout(function () {
        resetBoard(); 
        gamePage.style.display = 'none'; 
        firstPage.style.display = 'block'; 
    }, 5000); 
}

function resetBoard() {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].classList.remove("btn-player-1");
        buttons[i].classList.remove("btn-player-2");
    }

    playerNumber = 1;
    playerType.textContent = "Player - 1";
    filledCells = 0;
    gameoverContainer.style.display = 'none';

    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            filledGrid[i][j] = -1;
        }
    }
}





