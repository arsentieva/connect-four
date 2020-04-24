import { Game } from "./game.js";
let game = undefined;
function updateUI() {
  if (game === undefined) {
  }
}
const target = document.getElementById("click-targets");
const newGameButton = document.getElementById("new-game");
const formHolder = document.getElementById("form-holder");
let playerOne = document.getElementById("player-1-name");
let playerTwo = document.getElementById("player-2-name");
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

  /*************************************************** */

  const player1 = "black";
  const player2 = "red";

  let currentPlayer = player1;

  target.addEventListener("mouseover", (event) => {
    let currentTargetId = event.target.id;
    if (currentTargetId === "click-targets") {
      let classElement = event.target.className;
      if (classElement !== "") {
        target.classList.remove(classElement);
      }
      target.classList.add(currentPlayer);
      return;
    }
    let columnNum = currentTargetId.slice(currentTargetId.length - 1);
    let isFull = isColumnFull(columnNum);

    if (isFull) {
      event.target.classList.add("full");
    } else {
      event.target.classList.remove("full");
    }
  });

  target.addEventListener("click", (event) => {
    let currentTargetId = event.target.id;
    let columnNum = currentTargetId.slice(currentTargetId.length - 1);
    let dropIndex = columnAvailableIndex(columnNum);
    console.log(dropIndex);
    let squareCoordinates = `square-${dropIndex}-${columnNum}`;
    dropToken(squareCoordinates, currentPlayer);
    updatePlayer();
  });

  function dropToken(id, playerColor) {
    const droppedToken = document.getElementById(id);
    const token = document.createElement("div");
    droppedToken.appendChild(token);
    token.classList.add("token");
    token.classList.add(playerColor);
  }

  function updatePlayer() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }

  function columnAvailableIndex(columnNum) {
    const columns = buildColumnsElements(columnNum);
    for (let i = columns.length - 1; i >= 0; i--) {
      let cell = columns[i];
      if (cell.firstChild === null) {
        return i;
      }
    }
  }

  function buildRowsElements(row) {
    let rows = [];
    for (let i = 0; i <= 6; i++) {
      let searchTerm = `#square-${row}-${i}`;
      let columnElement = document.querySelector(searchTerm);
      rows.push(columnElement);
    }
  }

  function buildColumnsElements(column) {
    let columns = [];
    for (let i = 0; i <= 5; i++) {
      let searchTermColumn = `#square-${i}-${column}`;
      let rowElement = document.querySelector(searchTermColumn);
      columns.push(rowElement);
    }
    return columns;
  }

  function isColumnFull(column) {
    let lastColumn = buildColumnsElements(column);
    let isFull = lastColumn.every((cell) => {
      return cell.firstChild !== null;
    });
    return isFull;
  }
});
