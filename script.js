const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#textStatus");
const restartBtn = document.querySelector("#restart");
const winConditions = [ // Defining the win condition of the game

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4 ,8],
    [2, 4, 6]

];

let options = ["", "", "", "", "", "", "", "", ""]; // Options for clicking on the board
let currentPlayer = "X"; 
let running = false;

startGame(); 

function startGame(){ // Function to start the game
    console.log("Game started");  
    cells.forEach(cell => cell.addEventListener("click", cellClicked)) // Register that a cell is clicke
    restartBtn.addEventListener("click", restartGame); // Restart button
    statusText.textContent = `${currentPlayer}'s turn`; // Displays whos turn
    running = true;
}

function cellClicked() { // Function for when a cell is clicked
    console.log("Cell clicked");  
    const cellIndex = parseInt(this.getAttribute('cellIndex')); // Gets the attribute from the cell that is clicked and converts to int

    if (options[cellIndex] !== "" || !running) { // Stops the function if the cell array is not empty or if the game is not running
        return;
    }
    
    updateCell(this, cellIndex); // Calls the updateCell function to update the cell
    checkWinner(); // Calls the checkWinner function
}



function updateCell(cell, index){ // Function to update the current player cell
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){ // Function to swap player after each turn
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    textStatus.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){ // Function to check the winner of the game
    let roundWon = false; // Starts as false

    for(let i = 0; i < winConditions.length; i++){ // For loop for winning condition
        const condition = winConditions[i];
        // Values from option array
        const A = options[condition[0]];
        const B = options[condition[1]];
        const C = options[condition[2]]; 

        if(A == "" || B == "" || C == ""){ // Checks if the values are empty string
            continue;
        }
        if(A == B && B == C){ // Checks if the values are the same and if they are, it sets to roundWon
            roundWon = true;
            break;
        }
    }

    if(roundWon){ // If roundWon is true, displays the player who won
        textStatus.textContent = `${currentPlayer} is the big winner!`;
        running = false;
    }
    else if (!options.includes("")){ // If all cells are clicked and there are no empty strings in the option, it displays draw
        textStatus.textContent = `Thats a draw!`;
        running = false;
    }
    else { // If both conditions above are met, changePlayer
        changePlayer();
    }
}

function restartGame(){ // Function for restarting the game
    currentPlayer = "X"; // Player X starts
    options = ["", "", "", "", "", "", "", "", ""]; // Empty the board
    textStatus.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;

}
