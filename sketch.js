let cellSize = 15;
let grid, nextGrid;
let columns, rows;
let generate = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  columns = Math.floor(windowWidth / cellSize);
  rows = Math.floor(windowHeight / cellSize);
  createGrid();
}

function draw() {
  displayGrid();
  if (generate) {
    computeGeneration();
  }
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
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbors = countNeighbors(i, j);
      if (grid[i][j] == 1 && (neighbors < 2 || neighbors > 3)) {
        nextGrid[i][j] = 0;
      } else if (grid[i][j] == 0 && neighbors == 3) {
        nextGrid[i][j] = 1;
      } else {
        nextGrid[i][j] = grid[i][j];
      }
    }
  }

  let temp = grid;
  grid = nextGrid;
  nextGrid = temp;
}

function countNeighbors(x, y) {
  let count = 0;
  // moveCol = [-1, 0, 1, 1, 1, 0, -1];
  // moveRow = [-1, -1, -1, 0, 1, 1, 1, 0];
  // for (let i = 0; i < moveCol.length; i++) {
  //   count += grid[(x + moveCol[i], y + moveRow[i])];
  // }
  // return count;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i == 0 && j == 0) continue;
      count += grid[(x + i + columns) % columns][(y + j + rows) % rows];
    }
  }
  return count;
}

function createGrid() {
  grid = new Array(columns);
  nextGrid = new Array(columns);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
    grid[i].fill(0);
    nextGrid[i] = new Array(rows);
    nextGrid[i].fill(0);
    for (let j = 0; j < rows; j++) {
      let x = Math.random();
      if (x > 0.8) {
        grid[i][j] = 1;
      } else {
        grid[i][j] == 0;
      }
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);
  print(grid[x][y]);
  print(grid[x][y] == 1);
  if (grid[x][y] == 1) {
    grid[x][y] = 0;
  } else {
    grid[x][y] = 1;
  }
  print(grid[x][y]);
}

function keyPressed() {
  if (key == " ") {
    generate = !generate;
  } else if (key == "s") {
    computeGeneration();
    generate = false;
  }
}
