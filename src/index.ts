import Matrix from "./lib/matrix";

const m1 = new Matrix(3, 2, [
  [1, 2, 3],
  [4, 5, 6],
]);

const m2 = new Matrix(3, 2, [
  [6, 5, 4],
  [3, 2, 1],
]);

m1.print();
m2.print();

m2.sub(m1);
m2.print();
