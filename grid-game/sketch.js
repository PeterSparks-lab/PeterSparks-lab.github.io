// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameArray;
let inventory;
let area;
let spaceSize = 23;
let inventoryY = 3;
let inventoryX = 7;
let slotSize;
let spaces;
let showInv = false;
let invArray;
let img;
let guy;
let playerX;
let playerY;
let grid1;
let grid2;

function preload(){
  grid2 = loadStrings("assets/levels/level.txt");
  //grid1 = loadStrings("assets/levels/level3.txt");
  img = loadImage("assets/images/warehouse-2.png.png");
  guy = loadImage("assets/images/warehouseguy.png");
}

function setup() {
  createCanvas(450,450);
  grid1 = [
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
  ];

  inventory = createInventory(inventoryY, inventoryX);
  slotSize = width/7;
  spaces = width/spaceSize;
  area = theGameArea();
  grid1 = convertedToInt(grid1);
  playerY = grid1[1][1];
  playerX = grid1[1][1];
  console.log(playerX,playerY);
}


function draw() {
  background(img);
  //image(guy,25,25,50,50);
  player();
  theGuy();
  if (showInv) {
    displayInventory();
    
  }
  if (!showInv){
    theGameArea();

  }
  
}

function createInventory(invHeight,invWidth) {
  invArray = [];
  for (let y=0; y<invHeight; y++) {
    invArray.push([]);
    for (let x=0; x<invWidth; x++) {
      invArray[y].push(0);

    }
  } 
  //console.log(invArray);
  return invArray;
}

function keyPressed() {
  if (key === "q") {
    showInv = !showInv;
  }
  if (key === "r") {
    let theX = int(random(0,7));
    let theY = int(random(0,4));
    invArray[theY][theX] = 1;
  }
  if (key === "e") {
    createInventory(inventoryY,inventoryX);
  }
  if (key === "d") {
    if (grid2[playerY][playerX+1] === "."){
      playerX += 1;
    }
  }
  if (key === "a") {
    if (grid2[playerY][playerX-1] === ".") {
      playerX -=1;
    }
  }
  if (key === "w") {
    if (grid2[playerY-1][playerX] === ".") {
      playerY -= 1;
    }
  }
  if (key === "s") {
    if (grid2[playerY+1][playerX] === ".") {
      playerY += 1;
    }
  }
}

function displayInventory() {
  
  for (let y=0; y<inventoryY; y++) {
    for (let x=0; x<inventoryX; x++) {
      if (inventory[y][x] === 1) {
        fill("black");
      }
      else {
        fill("white");
      }
      stroke(1);
      rect(x*slotSize, y*slotSize, slotSize, slotSize);
    }
  }
}

function theGameArea() {
  gameArray = [];
  for (let y=0; y<spaceSize; y++) {
    for (let x=0; x<spaceSize; x++) {
      noFill();
      noStroke();
      rect(x*spaces, y*spaces, spaces, spaces);
    }
  }
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

function player(){
  noStroke;
  noFill;
  //fill("black");
  rect(playerX*spaces,playerY*spaces,spaces,spaces);
}

function theGuy(){
  image(guy,playerX*spaces,playerY-1, spaces, spaces*2);
}