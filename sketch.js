let cellSize = 12;
let grid, nextGrid;
let columns, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  columns = Math.floor(windowWidth / cellSize);
  rows = Math.floor(windowHeight / cellSize);
}

function draw() {}
function displayGrid() {}
function createGrid() {
  grid = new Array(columns);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
    grid[i].fill(0);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random(0, 2));
    }
  }
}
