let cellSize = 12;
let grid, nextGrid;
let columns, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  columns = Math.floor(windowWidth / cellSize);
  rows = Math.floor(windowHeight / cellSize);
  createGrid();
}

function draw() {
  displayGrid();
}
function displayGrid() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let c = grid[i][j] == 1 ? 0 : 255;
      fill(c);
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

function countNeighbors(x, y) {}

function createGrid() {
  grid = new Array(columns);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
    grid[i].fill(0);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
      print(grid[i][j]);
    }
  }

  function mousePressed() {
    let x = Math.floor(mouseX / cellSize);
    let y = Math.floor(mouseY / cellSize);
    grid[x][y] = !grid[x][y];
    print(grid[x][y]);
  }
}
