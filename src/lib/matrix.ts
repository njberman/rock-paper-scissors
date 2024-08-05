export default class Matrix {
  colCount: number;
  rowCount: number;

  rows: number[][];

  constructor(colCount: number, rowCount: number, matrix?: number[][]) {
    this.colCount = colCount;
    this.rowCount = rowCount;

    this.rows = Array.from({ length: rowCount }, () =>
      Array.from({ length: colCount }, () => 0),
    );

    if (matrix !== undefined)
      matrix.forEach((row, i) => {
        this.rows[i] = row;
      });
  }

  print() {
    let printString = "";

    this.rows.forEach((row) => {
      printString += row.join(" ");
      printString += "\n";
    });

    console.log(printString);
  }

  getCell(i: number, j: number) {
    if (i > this.colCount - 1 || j > this.rowCount - 1 || i < 0 || j < 0) {
      console.error(
        "Position for cell passed in is not in the bounds of the matrix.",
      );
      return;
    }

    return this.rows[j][i];
  }

  setCell(value: number, i: number, j: number) {
    if (i > this.colCount - 1 || j > this.rowCount - 1 || i < 0 || j < 0) {
      console.error(
        "Position for cell passed in is not in the bounds of the matrix.",
      );
      return;
    }

    this.rows[j][i] = value;
  }

  copy() {
    return new Matrix(
      this.colCount,
      this.rowCount,
      this.rows.slice().map((row) => row.slice()),
    );
  }

  mult(b: number | Matrix): Matrix {
    if (typeof b === "number") {
      for (let j = 0; j < this.rowCount; j++) {
        for (let i = 0; i < this.colCount; i++) {
          this.setCell(b * this.getCell(i, j), i, j);
        }
      }
    } else {
    }
    return this.copy();
  }

  add(b: Matrix): Matrix {
    if (this.colCount !== b.colCount || this.rowCount !== b.rowCount) {
      console.error("Mismatched column or row size between matrices");
      return;
    }

    for (let j = 0; j < this.rowCount; j++) {
      for (let i = 0; i < this.colCount; i++) {
        this.setCell(this.getCell(i, j) + b.getCell(i, j), i, j);
      }
    }

    return this.copy();
  }

  sub(b: Matrix): Matrix {
    return this.add(b.copy().mult(-1));
  }
}
