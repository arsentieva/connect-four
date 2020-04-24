export class Column {
  constructor() {
    this.tokens = [null, null, null, null, null, null];
    this.token = null;
  }

  addToken(playerColor) {
    for (let i = this.tokens.length - 1; i >= 0; i--) {
      this.token = this.tokens[i];
      if (this.token === null) {
        return (this.tokens[i] = playerColor);
      }
    }
  }
  getTokenAt(row) {
    return this.tokens[row];
  }
  isFull() {
    return this.tokens.every((token) => {
      return token !== null;
    });
  }
}
