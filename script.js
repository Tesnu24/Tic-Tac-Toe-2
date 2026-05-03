let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = false;
let gameMode = null;
let playerXName = "Player X";
let playerOName = "Player O";

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const singleBtn = document.getElementById("singleBtn");
const multiBtn = document.getElementById("multiBtn");

const winPatterns = [
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

singleBtn.onclick = () => {
gameMode = "single";
startGame();
};

multiBtn.onclick = () => {
gameMode = "multi";
startGame();
};

function startGame() {
board = ["","","","","","","","",""];
currentPlayer = "X";
gameActive = true;

// get names from inputs
playerXName = document.getElementById("playerX").value || "Player X";
playerOName = document.getElementById("playerO").value || "Player O";

statusText.textContent =currentPlayer === "X"
? playerXName + "'s turn"
: playerOName + "'s turn";

cells.forEach(c => {
c.textContent = "";
c.classList.remove("win");
});
}

cells.forEach(cell => {
cell.addEventListener("click", () => {
const index = cell.getAttribute("data-index");

if (!gameActive || board[index] !== "") return;

makeMove(index);

if (gameMode === "single" && currentPlayer === "O" && gameActive) {
setTimeout(computerMove, 400);
}
});
});

function makeMove(index) {
board[index] = currentPlayer;
cells[index].textContent = currentPlayer;

let win = checkWinner();
if (win) {
win.forEach(i => cells[i].classList.add("win"));
statusText.textContent = currentPlayer + " wins!";
gameActive = false;
return;
}

if (!board.includes("")) {
statusText.textContent = "Draw!";
gameActive = false;
return;
}

currentPlayer = currentPlayer === "X" ? "O" : "X";
statusText.textContent = "Player " + currentPlayer + "'s turn";
}

function checkWinner() {
for (let pattern of winPatterns) {
let [a,b,c] = pattern;
if (board[a] && board[a] === board[b] && board[a] === board[c]) {
return pattern;
}
}
return null;
}

function computerMove() {
let move = findWinningMove("O") || findWinningMove("X") || getBestMove();
makeMove(move);
}

function findWinningMove(player) {
for (let i = 0; i < 9; i++) {
if (board[i] === "") {
board[i] = player;
if (checkWinner()) {
board[i] = "";
return i;
}
board[i] = "";
}
}
return null;
}

function getBestMove() {
const priority = [4,0,2,6,8,1,3,5,7];
for (let i of priority) {
if (board[i] === "") return i;
}
}

restartBtn.onclick = startGame;
