export class RowWinInspector {
  constructor(column1, column2, column3, column4) {
    this.columns = [column1, column2, column3, column4];
  }

  inspect() {
    for (let i = 0; i < 6; i++) {
      let col1 = this.columns[0];
      let col2 = this.columns[1];
      let col3 = this.columns[2];
      let col4 = this.columns[3];
      if (
        col1.tokens[i] === col2.tokens[i] &&
        col2.tokens[i] === col3.tokens[i] &&
        col3.tokens[i] === col4.tokens[i]
      ) {
        return col1.tokens[i]; // the value from the row/ the color
      }
    }
    return "purple";
  }
}
