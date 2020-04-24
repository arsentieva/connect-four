import { Column } from "./column.js";
export class Game {
  constructor(playerOneName, playerTwoName) {
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
    this.currentPlayer = "black";
    this.columns = this.initializeColumns();
    this.currentColumn = -1;
    this.winnerColor = "purple";
  }

  getName() {
    if (this.winnerColor === "orange") {
      return `${this.playerOneName} ties with ${this.playerTwoName}!`;
    }
    return this.playerOneName + " vs. " + this.playerTwoName;
  }

  playInColumn(number) {
    // debugger;
    this.currentColumn = this.columns[number];
    this.currentColumn.addToken(this.currentPlayer);
    if (this.currentPlayer === "black") {
      this.currentPlayer = "red";
    } else {
      this.currentPlayer = "black";
    }
    this.checkForTie();
  }

  initializeColumns() {
    let array = [];
    for (let i = 0; i <= 6; i++) {
      array.push(new Column());
    }
    return array;
  }
  getTokenAt(row, column) {
    this.currentColumn = this.columns[column];
    let token = this.currentColumn.getTokenAt(row);
    return token;
  }

  isColumnFull(index) {
    // debugger;
    return this.columns[index].isFull();
  }

  checkForTie() {
    let allFull = this.allColumnsFull();
    if (allFull) {
      this.winnerColor = "orange";
    }
  }

  allColumnsFull() {
    for (let i = 0; i <= this.columns.length - 1; i++) {
      let column = this.columns[i];
      if (!this.isColumnFull(column)) {
        return false;
      }
    }
    return true;
  }
}

// exports.Game = Game;
