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
  computeGeneration();
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
function computeGeneration() {
  for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      let neighbors = countNeighbors(i, j);
      if (grid[i][j] == 1 && (neighbors == 2 || neighbors == 3)) {
        newGrid[i][j] == 0;
      } else if (grid[i][j] == 0 && neighbors == 3) {
        newGrid[i][j] == 1;
      } else {
        newGrid[i][j] == grid[i][j];
      }
    }
  }

  let temp = grid;
  let grid = newGrid;
  let newGrid = temp;
}

function countNeighbors(x, y) {
  let count = 0;
  moveCol = [-1, 0, 1, 1, 1, 0, -1];
  moveRow = [-1, -1, -1, 0, 1, 1, 1, 0];
  for (let i = 0; i < moveCol.length; i++) {
    count += grid[(x + moveCol[i], y + moveRow[i])];
  }
  return count;
}

function createGrid() {
  grid = new Array(columns);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
    grid[i].fill(0);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);
  if (grid[x][y] == 1) {
    grid[x][y] == 0;
  } else {
    grid[x][y] == 1;
  }
  print(grid[x][y]);
}
