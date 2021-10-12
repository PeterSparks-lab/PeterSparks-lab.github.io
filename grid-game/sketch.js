// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Declare global variables
let spawnBox = [];
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
let right;
let left;
let front;
let back;
let guy;
let playerX;
let playerY;
let grid1;
let grid2;
let invBack;
let yBox;
let myBox;
let invBox;
let score = 0;
let waitTime = 5000;
let startTime;
// console.log("globals");


//Load map and sprites from assets folder
function preload(){
  // console.log("preload");
  grid2 = loadStrings("assets/levels/level.txt");
  //grid1 = loadStrings("assets/levels/level3.txt");
  img = loadImage("assets/images/warehouse-2.png.png");
  right = loadImage("assets/images/guyFaceRight.png");
  left = loadImage("assets/images/guyFaceLeft.png");
  front = loadImage("assets/images/guyFaceFront.png");
  back = loadImage("assets/images/guyFaceBack.png");
  yBox = loadImage("assets/images/yBox.png");
  invBox = loadImage("assets/images/yBox2.png");
  myBox = new Box(3,19,yBox);
  //invBack = loadImage("assets/images/invBackgound.png");
  guy = right;
}

function setup() {
  // console.log("setup");
  //createCanvas(windowWidth,windowHeight);
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
  startTime = millis();
}


function draw() {
  // console.log("draw");
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
  myBox.display();
  myBox.move();
  //createBoxes();
}

//Creates the array used for the inventory
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
  if (key === "d") {
    guy = right;
    if (grid2[playerY][playerX+1] === "."){
      playerX += 1;
      console.log(playerX);
    }
  }
  if (key === "a") {
    guy = left;
    if (grid2[playerY][playerX-1] === ".") {
      playerX -=1;
      console.log(playerX);
    }
  }
  if (key === "w") {
    guy = back;
    if (grid2[playerY-1][playerX] === ".") {
      playerY -= 1;
      console.log(playerY);
    }
  }
  if (key === "s") {
    guy = front;
    if (grid2[playerY+1][playerX] === ".") {
      playerY += 1;
      console.log(playerY);
    }
  }
  if (key === " ") {
    for (let y=0; y<inventoryY; y++) {
      for (let x=0; x<inventoryX; x++) {
        if (inventory[y][x] === 0) {
          if (guy === front) {
            if (myBox.x === playerX && myBox.y === playerY+1) {
              if (playerX !== 3) {
                myBox.onConveyor = false;
                inventory[y][x] = 1;
                myBox.reset();
              }
              //image(yBox, x*slotSize, y*slotSize, slotSize *2,slotSize *2);
            }
          }
        }
      }
    }
  }
  if (key === "e") {
    if (guy === right) {
      if (grid2[playerY-1][playerX+1] === "Y") {
        showInv = true;
        for (let y=0; y<inventoryY; y++) {
          for (let x=0; x<inventoryX; x++) {
            if (inventory[y][x] === 1) {
              inventory[y][x] = 0;
            }
          }
        }
      }
    }
  }
}


function displayInventory() {
  
  for (let y=0; y<inventoryY; y++) {
    for (let x=0; x<inventoryX; x++) {
      if (inventory[y][x] === 1) {
        image(invBox, x*slotSize, y*slotSize, slotSize,slotSize);
      }
      else {
        noFill();
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
      //noStroke();
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
  //noStroke();
  noFill();
  //fill("black");
  rect(playerX*spaces,playerY*spaces,spaces,spaces);
}

function theGuy(){
  image(guy,playerX*spaces,playerY*spaces-spaces, spaces, spaces*2);
}

class Box {
  constructor(x,y,sprite) {
    this.x = x;
    this.alsoX = x;
    this.y = y;
    this.sprite = sprite;
    //this.size = spaces;
    this.onConveyor = true;
    this.collected = false;
    this.duration = 2000;
    this.lastMove = 0;
  }


  display() {
    noFill();
    noStroke();
    if (this.onConveyor === true) {
      image(yBox,this.x*spaces, this.y*spaces, spaces, spaces);

    }
    
  }

  move() {
    if (this.onConveyor === true) {
      if (this.x === 11) {
        this.onConveyor = false;
        this.reset();
      }
      else if (millis() > this.lastMove + this.duration) {
        this.x += 1;
        this.lastMove = millis();
      }
    }
  }

  reset() {
    this.x = this.alsoX;
    this.lastMove = millis();
    this.onConveyor = true;
  }
}

// function createBoxes() {
//   for (let i=0; i<100; i++) {
//     if ( millis() > startTime + waitTime) {
//       let aBox = new Box(3, 19, yBox);
//       spawnBox.push(aBox);
//       spawnBox[i].display();
//       spawnBox[i].move();
//       startTime = millis();
//     }
//   } 
// }