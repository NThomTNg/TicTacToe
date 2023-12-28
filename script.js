const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#textStatus");
const restartBtn = document.querySelector("#restart");
const winConditions = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4 ,8],
    [2, 4, 6]

];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGame();

function startGame(){
    console.log("Game started");  
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    console.log("Cell clicked");  
    const cellIndex = parseInt(this.getAttribute('cellIndex'));

    if (options[cellIndex] !== "" || !running) {
        return;
    }
    
    updateCell(this, cellIndex);
    checkWinner();
}



function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    textStatus.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const A = options[condition[0]];
        const B = options[condition[1]];
        const C = options[condition[2]];

        if(A == "" || B == "" || C == ""){
            continue;
        }
        if(A == B && B == C){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        textStatus.textContent = `${currentPlayer} is the big winner!`;
        running = false;
    }
    else if (!options.includes("")){
        textStatus.textContent = `Thats a draw!`;
        running = false;
    }
    else {
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    textStatus.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;

}