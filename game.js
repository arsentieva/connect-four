import { Column } from "./column.js";
import { ColumnWinInspector } from "./column-win-inspector.js";
import { RowWinInspector } from "./row-win-inspector.js";
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
    if (this.winnerColor === "black") {
      return `${this.playerOneName} wins!`;
    }
    if (this.winnerColor === "red") {
      return `${this.playerTwoName} wins!`;
    }
    if (this.winnerColor === "orange") {
      return `${this.playerOneName} ties with ${this.playerTwoName}!`;
    }
    return this.playerOneName + " vs. " + this.playerTwoName;
  }

  playInColumn(number) {
    this.currentColumn = this.columns[number];
    this.currentColumn.addToken(this.currentPlayer);
    if (this.currentPlayer === "black") {
      this.currentPlayer = "red";
    } else {
      this.currentPlayer = "black";
    }
    this.checkForTie();
    this.checkForColumnWin();

    this.checkForRowWin();
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
    if (this.winnerColor === "black" || this.winnerColor === "red") {
      return true;
    }
    return this.columns[index].isFull();
  }

  checkForTie() {
    let allFull = this.allColumnsFull();
    if (allFull) {
      this.winnerColor = "orange";
    }
  }

  allColumnsFull() {
    //   for (let i = 0; i <= this.columns.length - 1; i++) {
    //     let column = this.columns[i];
    //     if (!this.isColumnFull(i)) {
    //       return false;
    //     }
    //   }
    //   return true;
    // }
    return this.columns.every((column, i) => {
      return column.isFull(i);
    });
  }
  checkForColumnWin() {
    if (this.winnerColor !== "purple") {
      return;
    }
    for (let i = 0; i < this.columns.length; i++) {
      let column = this.columns[i];
      let columnInspector = new ColumnWinInspector(column);
      let color = columnInspector.inspect();
      if (color !== "purple") {
        this.winnerColor = color;
      }
    }
  }

  checkForRowWin() {
    if (this.winnerColor !== "purple") {
      return;
    }
    let groupOne = this.columns.slice(0, 3);
    let rowInspect1 = new RowWinInspector(...groupOne);
    let color1 = rowInspect1.inspect();

    let groupTwo = this.columns.slice(1, 4);
    let rowInspect2 = new RowWinInspector(...groupTwo);
    let color2 = rowInspect2.inspect();

    let groupThree = this.columns.slice(2, 5);
    let rowInspect3 = new RowWinInspector(...groupThree);
    let color3 = rowInspect3.inspect();

    let groupFour = this.columns.slice(3, 6);
    let rowInspect4 = new RowWinInspector(...groupFour);
    let color4 = rowInspect4.inspect();
  }
}
