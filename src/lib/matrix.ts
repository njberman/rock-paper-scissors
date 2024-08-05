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

  transpose(): Matrix {
    const transposed = new Matrix(this.rowCount, this.colCount);

    for (let j = 0; j < transposed.rowCount; j++) {
      for (let i = 0; i < transposed.colCount; i++) {
        transposed.setCell(this.getCell(j, i), i, j);
      }
    }

    return transposed;
  }

  mult(b: number | Matrix): Matrix {
    if (typeof b === "number") {
      for (let j = 0; j < this.rowCount; j++) {
        for (let i = 0; i < this.colCount; i++) {
          this.setCell(b * this.getCell(i, j), i, j);
        }
      }

      return this.copy();
    }

    if (this.colCount !== b.rowCount) {
      console.error("Mismatched column or row size between matrices");
      return;
    }

    const thisCopy = this.copy();
    const product = new Matrix(b.colCount, this.rowCount);
    for (let j = 0; j < product.rowCount; j++) {
      for (let i = 0; i < product.colCount; i++) {
        const row = thisCopy.rows[j];
        const col = thisCopy.transpose().rows[i];

        let sum = 0;
        for (let index = 0; index < row.length; index++) {
          sum += row[index] * col[index];
        }

        product.setCell(sum, i, j);
      }
    }

    this.colCount = product.colCount;
    this.rowCount = product.rowCount;
    this.rows = product.rows.slice().map((row) => row.slice());

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
