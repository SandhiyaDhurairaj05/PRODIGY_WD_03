const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if(gameState[clickedIndex] !== "" || checkWinner()) return;

    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.color = currentPlayer === 'X' ? '#f5576c' : '#f093fb';
    clickedCell.style.transform = 'scale(1.2)';
    setTimeout(() => clickedCell.style.transform = 'scale(1)', 200);

    if(checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        return;
    }

    if(!gameState.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    for(let i=0; i<winningConditions.length; i++) {
        const [a,b,c] = winningConditions[i];
        if(gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            highlightWinner([a,b,c]);
            return true;
        }
    }
    return false;
}

function highlightWinner(indices) {
    indices.forEach(index => {
        cells[index].style.backgroundColor = '#fef3b7';
        cells[index].style.color = '#d97706';
    });
}

function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
        cell.style.color = '#333';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
