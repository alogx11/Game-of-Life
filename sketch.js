let cellSize = 12;
let grid, nextGrid;
let columns, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  columns = Math.floor(windowWidth / cellSize);
  rows = Math.floor(windowHeight / cellSize);
}
