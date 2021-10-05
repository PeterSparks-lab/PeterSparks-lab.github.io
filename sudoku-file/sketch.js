// Sudoku demo

let initialGrid;

let solvedGrid = [
  [6, 2, 4, 3, 8, 7, 5, 9, 1],
  [1, 3, 9, 4, 5, 6, 8, 2, 7],
  [7, 5, 8, 1, 9, 2, 4, 3, 6],
  [4, 9, 6, 8, 1, 3, 7, 5, 2],
  [2, 8, 3, 7, 6, 5, 1, 4, 9],
  [5, 1, 7, 9, 2, 4, 3, 6, 8],
  [9, 4, 1, 2, 3, 8, 6, 7, 5],
  [3, 6, 2, 5, 7, 1, 9, 8, 4],
  [8, 7, 5, 6, 4, 9, 2, 1, 3]
];

let gridDimensions = 9;

let cellSize;

let grid;

function preload() {
  initialGrid = loadStrings("assets/level2.txt");
}

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }

  initialGrid = convertedToInt(initialGrid);

  grid  = initialGrid;
  cellSize = width/gridDimensions;
}

function convertedToInt(initialGrid) {
  //assume rectangular array
  let rows = initialGrid.length;
  let cols = initialGrid[0].length;

  let newGrid = [];
  for (let y=0; y<rows; y++) {
    newGrid.push([]);
    for (let x=0; x<cols; x++) {
      newGrid[y].push(int(initialGrid[y][x]));
    }
  }
  return newGrid;
}

function draw() {
  background(220);
  displayGrid();

}

function displayGrid() {
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      fill("white");
      strokeWeight(1);
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
      
      fill("black");
      textSize(cellSize*0.75);
      textAlign(CENTER, CENTER);
      if (grid[y][x] !== 0){
        text(grid[y][x], x*cellSize+cellSize/2, y*cellSize+cellSize/2);

      }
    }
  }

  drawCageLines();

}

function drawCageLines() {
  strokeWeight(4);

  for (let location=0; location <=9; location+=3) {
    line(0, location*cellSize, width, location*cellSize);
    line(location*cellSize, 0, location*cellSize, height);
  }
}

function mouseClicked(){
  if (grid === initialGrid || grid === solvedGrid){
    swap();
  }
}

function swap() {
  if (grid === initialGrid) {
    grid = solvedGrid;
  }
  else if ( grid === solvedGrid) {
    grid = initialGrid;
  }
}