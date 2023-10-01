let cellSize = 15;
let grid, nextGrid;
let columns, rows;
let generate = false;
let aliveColor, bgColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  columns = Math.floor(windowWidth / cellSize);
  rows = Math.floor(windowHeight / cellSize);
  createGrid();
  aliveColor = color(0);
  bgColor = 255;
}

function draw() {
  background(bgColor);
  displayGrid();
  if (generate) {
    computeGeneration();
  }
}

function displayGrid() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let c = grid[i][j] == 1 ? aliveColor : bgColor;
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
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i == 0 && j == 0) continue; // check ordered pairs aound x,y
      count += grid[(x + i + columns) % columns][(y + j + rows) % rows];
    }
  }
  return count;
}

function createGrid() {
  grid = new Array(columns); // create array of length columns of arrays.
  nextGrid = new Array(columns); // create second array where we store computed values
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows); // set length of each column
    grid[i].fill(0); // fill each column full of 0s
    nextGrid[i] = new Array(rows);
    nextGrid[i].fill(0);
    for (let j = 0; j < rows; j++) { //randomly fill each cell with a 1 or 0
      let x = Math.random();
      if (x > 0.5) {
        grid[i][j] = 1;
      } else {
        grid[i][j] == 0;
      }
    }
  }
}

function mousePressed() { //flip the state of cell when clicked on
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);
  if (grid[x][y] == 1) {
    grid[x][y] = 0;
  } else {
    grid[x][y] = 1;
  }
}

function getRandomColor() { // generate three random values for rgb
  let c = color(
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  );
  return c;
}

function keyPressed() {
  if (key == " ") { // start and stop generation
    generate = !generate;
  } else if (key == "s") { // compute one generation 
    computeGeneration();
    generate = false;
  } else if (key == "c") { // clear the grid
    for (let i = 0; i < grid.length; i++) {
      grid[i].fill(0); // fill each array full of zeros to clear
    }
  } else if (key == "r") { // reset grid
    createGrid();
  } else if (key == "f") { // create random theme
    bgColor = getRandomColor(); // change background color
    aliveColor = getRandomColor(); //change color of alive cells
    stroke(aliveColor);
  } else if (key == "g") { // create a glider in a random spot
    /* glider shape
    O X O
    O O X
    X X X
    */
    let x = Math.floor(Math.random() * columns);
    let y = Math.floor(Math.random() * rows);
    print(x + ' ' + y);
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        print ((i == 0 && j == -1) || (i == 1 && j == 0) || j == 1);
        if ((i == 0 && j == -1) || (i == 1 && j == 0) || j == 1) { // cases where cell is alive
          grid[(x + i + columns) % columns][(y + j + rows) % rows] = 1;
        } else { // cell is dead
          grid[(x + i + columns) % columns][(y + j + rows) % rows] = 0;
        }
      }
    }
  }
}
