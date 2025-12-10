// Select elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");
const boardElement = document.getElementById("board");

// Game variables
let currentPlayer = "X";
let gameActive = true;
// Represent the board as an array of 9 positions
let boardState = ["", "", "", "", "", "", "", "", ""];

// All winning combinations (indexes of cells)
const winningPatterns = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
];

// Handle a cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    // Ignore click if:
    // - the cell already has a value
    // - the game has ended
    if (!gameActive || boardState[index] !== "") return;

    // Place the current player's symbol
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("filled");

    // Check if this move ends the game
    checkResult();
}

// Check for a win or tie
function checkResult() {
    let roundWon = false;
    let winningCells = [];

    // Check each winning pattern
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        const v1 = boardState[a];
        const v2 = boardState[b];
        const v3 = boardState[c];

        if (v1 && v1 === v2 && v2 === v3) {
            roundWon = true;
            winningCells = pattern;
            break;
        }
    }

    if (roundWon) {
        // Highlight winning cells
        winningCells.forEach((i) => cells[i].classList.add("win"));

        statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
        boardElement.classList.add("disabled");
        return;
    }

    // If all cells filled and no winner => tie
    if (!boardState.includes("")) {
        statusText.textContent = "It's a tie! 🤝";
        gameActive = false;
        boardElement.classList.add("disabled");
        return;
    }

    // Switch turn to the other player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset game to initial state
function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    boardState = ["", "", "", "", "", "", "", "", ""];

    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("filled", "win");
    });

    boardElement.classList.remove("disabled");
    statusText.textContent = "Player X's turn";
}

// Add event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
