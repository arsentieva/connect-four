export class ColumnWinInspector {
  constructor(columnObject) {
    this.columnObject = columnObject;
  }

  inspect() {
    let columnLength = this.columnObject.tokens.length - 1; //5
    for (let i = 0; i < 3; i++) {
      //i = 2
      //Position One = 5 - 2 === 3
      let positionOne = this.columnObject.tokens[columnLength - i];
      // Posittion Two = 5-3  = 2
      let positionTwo = this.columnObject.tokens[columnLength - (i + 1)];
      //postion Three = 5 - 4 = 1
      let positionThree = this.columnObject.tokens[columnLength - (i + 2)];
      //postion Four = 5 - 5 =  0
      let positionFour = this.columnObject.tokens[columnLength - (i + 3)];

      if (
        positionOne === positionTwo &&
        positionTwo === positionThree &&
        positionThree === positionFour
      ) {
        return positionOne; //will return the value in that position, which is red or black
      }
    }
    return "purple"; //we have not a win case yet so the  game is still going on
  }
}
//
// [0, 1, 2, 3, 4, 5]
// column.lengh = 6 - 1 = 5;

// 0. 5, 4, 3, 2 == black / Red
// 1. 4, 3, 2, 1
// 2  3, 2, 1, 0,
