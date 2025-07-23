let gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let player = 'X';
let gameActive = true;
let scores = { X: 0, O: 0 };

// DOM elements
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player-display');
const gameStatus = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');
const resetScoresBtn = document.getElementById('reset-scores-btn');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const turnMarker = document.getElementById('turn-marker');

function updateDisplay() {
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index] === ' ' ? '' : gameBoard[index];
        cell.className = 'cell';
        if (gameBoard[index] === 'X') {
            cell.classList.add('x');
        } else if (gameBoard[index] === 'O') {
            cell.classList.add('o');
        }
    });
    
    currentPlayerDisplay.textContent = `Player ${player}'s Turn`;
    turnMarker.style.background = player === 'X' ? '#2563eb' : '#f59e0b';
    
    // Update scores
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function handleMove(position) {
    if (!gameActive) return false;
    
    if (gameBoard[position] === ' ') {
        gameBoard[position] = player;
        updateDisplay();
        
        if (checkWin()) {
            gameStatus.textContent = `🎉 Player ${player} Wins!`;
            gameStatus.className = 'status-message winner';
            gameActive = false;
            highlightWinningCells();
            scores[player]++;
            updateDisplay();
            return true;
        }

        if (gameBoard.every(cell => cell !== ' ')) {
            gameStatus.textContent = "🤝 It's a Draw!";
            gameStatus.className = 'status-message draw';
            gameActive = false;
            return true;
        }

        player = player === 'X' ? 'O' : 'X';
        updateDisplay();
        return true;
    }
    return false;
}

function resetGame() {
    gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    player = 'X';
    gameActive = true;
    gameStatus.textContent = '';
    gameStatus.className = 'status-message';
    
    // Remove winning highlights
    cells.forEach(cell => {
        cell.classList.remove('winning');
    });
    
    updateDisplay();
}

function resetScores() {
    scores = { X: 0, O: 0 };
    resetGame();
}

// Event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleMove(index));
});

resetBtn.addEventListener('click', resetGame);
resetScoresBtn.addEventListener('click', resetScores);

// Initialize the game
updateDisplay();

function checkWin() {
    const conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    return conditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player;
    });
}

function highlightWinningCells() {
    const conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    conditions.forEach(condition => {
        const [a, b, c] = condition;
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
            cells[a].classList.add('winning');
            cells[b].classList.add('winning');
            cells[c].classList.add('winning');
        }
    });
}



