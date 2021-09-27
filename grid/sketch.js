// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridSize =10;
let grid;

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }

  grid = createEmptyGrid(gridSize);
}

function draw() {
  background(220);
  displayGrid();
  createRandomGrid();

}

function createEmptyGrid(howLarge){
  let emptyArray =[];
  for (let y=0; y<howLarge; y++){
    emptyArray.push([]);
    for (let x=0; x<howLarge; x++){
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

// function displayGrid(){
//   let cellSize = width/gridSize;
//   for(let y=0; y<grid.length; y++){
//     for (let x=0; x<grid[y].length; x++){
//       rect(x*cellSize, y*cellSize, cellSize, cellSize);
//     }
//   } 
// }

function createRandomGrid(howLarge){
  let emptyArray =[];
  for (let y=0; y<howLarge; y++){
    emptyArray.push([]);
    for (let x=0; x<howLarge; x++){
      if (random(0,100)<50){

        emptyArray[y].push(0);
      }
      else{
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}

function displayGrid() {
  let cellSize = width/gridSize;

  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}
