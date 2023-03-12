const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status-text");
let cellsValue = ["", "", "", "", "", "", "", "", ""]
const winningOptions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let currentPlayer;
let active = true;



(function startGame() {
    currentPlayer = 'X';
    cells.forEach(cell => { cell.addEventListener("click", clickCell) });
    statusText.innerText = `${currentPlayer}'s turn!`;
    document.getElementById("restart-btn").addEventListener("click", restart);
})();


function clickCell() {
    if (!active) return;

    if (this.innerHTML == "") {
        this.innerHTML = currentPlayer;
        cellsValue[parseInt(this.id)] = currentPlayer;
        if (checkWinner() == false) {
            changePlayer();
        }
    }
}
function changePlayer() {
    currentPlayer = currentPlayer == "O" ? "X" : "O";
    statusText.innerText = `${currentPlayer}'s turn!`;
}
function checkWinner() {
    let complete = true;
    for (let i = 0; i < winningOptions.length; i++) {
        let checkingCells = [cellsValue[winningOptions[i][0]], cellsValue[winningOptions[i][1]], cellsValue[winningOptions[i][2]]];
        if (checkingCells[0] == "" || checkingCells[1] == "" || checkingCells[2] == "") {
            complete = false;
        } else if (checkingCells[0] == checkingCells[1] && checkingCells[1] == checkingCells[2]) {
            win(currentPlayer, i);
            return true;
        }
    }
    if (complete) {
        draw();
        return true;
    }
    return false;
}
function draw() {
    statusText.innerText = "DRAW!";
    active = false;
}
function win(player, index) {
    statusText.innerText = `${player} wins!`;
    active = false;

    winningOptions[index].forEach(c => {
        cells[c].style.color = "red";
    });
}


function restart() {
    active = true;
    cells.forEach(element => {
        element.innerHTML = "";
        element.removeAttribute("style");
        cellsValue[parseInt(element.id)] = "";
    })
    changePlayer();
    debugger
}