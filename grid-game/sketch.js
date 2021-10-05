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
let grid;

function preload(){
  grid = loadStrings("assets/levels/level.txt");
  img = loadImage("assets/images/warehouse-2.png.png");
  guy = loadImage("assets/images/warehouseguy.png");
}

function setup() {
  createCanvas(450,450);
  inventory = createInventory(inventoryY, inventoryX);
  slotSize = width/7;
  spaces = width/spaceSize;
  area = theGameArea();
  playerX = spaces;
  playerY = spaces;
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
  console.log(invArray);
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
    if (grid[playerY][playerX+1] === "."){
      playerX += spaces;
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
      rect(x*slotSize, y*slotSize, slotSize, slotSize);
    }
  }
}

function theGameArea() {
  gameArray = [];
  for (let y=0; y<spaceSize; y++) {
    for (let x=0; x<spaceSize; x++) {
      noFill();
      rect(x*spaces, y*spaces, spaces, spaces);
    }
  }
} 

function player(){
  noStroke;
  noFill;
  rect(playerX,playerY,spaces,spaces);
}
function theGuy(){
  image(guy,playerX,playerY*2, spaces, spaces*2);
}