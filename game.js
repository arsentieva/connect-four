import { Column } from "./column.js";
export class Game {
  constructor(playerOneName, playerTwoName) {
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
    this.currentPlayer = "black";
    this.columns = this.initializeColumns();
    this.currentColumn = -1;
  }

  getName() {
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
    return this.columns[index].isFull();
  }
}

// exports.Game = Game;
