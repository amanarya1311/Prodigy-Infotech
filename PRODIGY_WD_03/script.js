// Get references to the HTML elements
const gameStatus = document.getElementById('gameStatus');
const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const cells = document.querySelectorAll('.cell'); // Get all elements with class 'cell'

// Game state variables
let board = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 board
let currentPlayer = 'X'; // 'X' is the starting player
let gameActive = true; // True if the game is ongoing, false if won or drawn

// Winning conditions: combinations of cell indices that result in a win
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6]  // Diagonal from top-right
];

// Function to update the game status message
const updateStatus = (message) => {
    gameStatus.textContent = message;
};

// Function to handle a cell click
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // If the cell is already filled or the game is not active, do nothing
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update the board and display the current player's mark
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer); // Add class for styling (e.g., color)

    // Check if the current player has won
    const winner = checkWinner();
    if (winner) {
        updateStatus(`Player ${winner} has won!`);
        gameActive = false; // End the game
        return;
    }

    // Check if it's a draw (all cells filled and no winner)
    if (!board.includes('')) {
        updateStatus("It's a draw!");
        gameActive = false; // End the game
        return;
    }

    // Switch to the next player
    handlePlayerChange();
};

// Function to switch the current player
const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer}'s Turn`);
};

// Function to check for a winner
const checkWinner = () => {
    let roundWon = false;
    let winner = null;

    // Iterate through all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        // Get the values from the board for the current winning condition
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        // If any cell in the condition is empty, continue to the next condition
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // If all cells in the condition are the same, we have a winner
        if (a === b && b === c) {
            roundWon = true;
            winner = a; // The winner is the player who made the winning move
            break; // Exit the loop as a winner is found
        }
    }
    return winner;
};

// Function to restart the game
const handleRestartGame = () => {
    board = ['', '', '', '', '', '', '', '', '']; // Reset the board
    currentPlayer = 'X'; // Reset current player to 'X'
    gameActive = true; // Set game back to active
    updateStatus(`Player ${currentPlayer}'s Turn`); // Update status message

    // Clear all cell contents and remove player-specific classes
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
};

// Add event listeners
// Add click listener to each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
// Add click listener to the restart button
restartButton.addEventListener('click', handleRestartGame);

// Initial status message
updateStatus(`Player ${currentPlayer}'s Turn`);
