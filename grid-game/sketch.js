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

function preload(){
  img = loadImage("assets/images/warehouse-1.png");
}

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  inventory = createInventory(inventoryY, inventoryX);
  slotSize = width/7;
  spaces = width/spaceSize;
  area = theGameArea();
}

function draw() {
  background(img);

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