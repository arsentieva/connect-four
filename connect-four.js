import { Game } from "./game.js";
let game = undefined;
let currentPlayer = "";
function updateUI() {
  if (game === undefined) {
    boarerHolder.classList.add("is-invisible");
  } else {
    boarerHolder.classList.remove("is-invisible");
    gameName.innerHTML = game.getName();

    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 6; j++) {
        let row = i;
        let column = j;
        let squareId = `square-${row}-${column}`;
        const square = document.getElementById(squareId);
        square.innerHTML = "";
        let result = game.getTokenAt(row, column);
        if (result === "black") {
          let div = document.createElement("div");
          div.classList.add("token");
          div.classList.add("black");
          square.appendChild(div);
        }
        if (result === "red") {
          let div = document.createElement("div");
          div.classList.add("token");
          div.classList.add("red");
          square.appendChild(div);
        }
      }
      currentPlayer = game.currentPlayer;
      if (currentPlayer === "red") {
        console.log("here");
        target.classList.add(currentPlayer);
        target.classList.remove("black");
      } else {
        target.classList.add(currentPlayer);
        target.classList.remove("red");
      }

      for (let k = 0; k <= 6; k++) {
        let columnId = `column-${k}`;
        const column = document.getElementById(columnId);
        let isFull = game.isColumnFull(k);
        if (isFull) {
          column.classList.add("full");
        }
      }
    }
  }
}
const target = document.getElementById("click-targets");
const newGameButton = document.getElementById("new-game");
const formHolder = document.getElementById("form-holder");
const boarerHolder = document.getElementById("board-holder");
let playerOne = document.getElementById("player-1-name");
let playerTwo = document.getElementById("player-2-name");
let gameName = document.getElementById("game-name");
window.addEventListener("DOMContentLoaded", (event) => {
  formHolder.addEventListener("keyup", handleNewGameButton);

  newGameButton.addEventListener("click", (event) => {
    game = new Game(playerOne.value, playerTwo.value);
    playerOne.value = "";
    playerTwo.value = "";
    handleNewGameButton();
    updateUI();
  });

  function handleNewGameButton() {
    if (playerOne.value !== "" && playerTwo.value !== "") {
      newGameButton.disabled = false;
    } else {
      newGameButton.disabled = true;
    }
  }

  target.addEventListener("click", (event) => {
    let currentTargetId = event.target.id;
    if (!currentTargetId.startsWith("column-")) {
      return;
    }
    let columnNum = currentTargetId.slice(currentTargetId.length - 1);
    game.playInColumn(Number.parseInt(columnNum));
    updateUI();
  });
});
