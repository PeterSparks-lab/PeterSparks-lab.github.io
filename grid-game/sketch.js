// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let inventory;
let inventoryY = 3;
let inventoryX = 7;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  inventory = createInventory(inventoryY, inventoryX);
  cellSize = width/7;
}

function draw() {
  background(220);
  if (keyIsPressed){
    displayInventory();
  }
}

function createInventory(invHeight,invWidth) {
  let newArray = [];
  for (let y=0; y<invHeight; y++) {
    newArray.push([]);
    for (let x=0; x<invWidth; x++) {
      newArray[y].push(0);

    }
  } 
  return newArray;
}

// function keyPressed(q) {
//   displayInventory();
// }

function displayInventory() {
  fill("blue");
  for (let y=0; y<inventoryY; y++) {
    for (let x=0; x<inventoryX; x++) {
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}
