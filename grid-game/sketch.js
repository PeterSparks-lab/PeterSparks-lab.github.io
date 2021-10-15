// Grid Based Game
// Peter Sparks
// Friday October 15 2021
//
// Extra for Experts:
// - used multiple grids
// - used objects
// - used text file to create level

// Declare global variables.....................................................................................................................................//
let gameArray;
let inventory;
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
let yBox;
let gBox;
let yellowBox;
let greyBox;
let invBox1;
let invBox2;
let score = 0;
let waitTime = 5000;
let startTime;
let randomPoints = 0;
let totalChange = 0;
let scoreTime1;
let scoreTime2;
let scoreTime3;
let greyChange = 0;
let yellowChange = 0;
let pickUp;
let putDown;
let music;
let playing;
//..............................................................................................................................................................//


//Load map and sprites from assets folder before setup.......................................................................................................................//
function preload(){
  grid2 = loadStrings("assets/levels/level.txt");
  img = loadImage("assets/images/warehouse-2.png.png");
  right = loadImage("assets/images/guyFaceRight.png");
  left = loadImage("assets/images/guyFaceLeft.png");
  front = loadImage("assets/images/guyFaceFront.png");
  back = loadImage("assets/images/guyFaceBack.png");
  yBox = loadImage("assets/images/yBox.png");
  gBox = loadImage("assets/images/greybox.png");
  invBox1 = loadImage("assets/images/yBox2.png");
  invBox2 = loadImage("assets/images/greybox1.png");
  yellowBox = new Box(3,19,yBox,2000);
  greyBox = new Box(3,20,gBox,3500);
  guy = right;
  music = loadSound("assets/sounds/S31-Puppet Warehouse.mp3");
  putDown = loadSound("assets/sounds/placebox.wav");
  pickUp = loadSound("assets/sounds/pickupbox.wav");
}
//..............................................................................................................................................................//

//..............................................................................................................................................................//
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
  playerY = grid1[1][1];
  playerX = grid1[1][1];
  console.log(playerX,playerY);
  startTime = millis();
  playing = false;
}
//..............................................................................................................................................................//

//..............................................................................................................................................................//
function draw() {
  background(img);
  player();
  if (showInv) {
    displayInventory();
  }
  yellowBox.display();
  yellowBox.move();
  greyBox.display();
  greyBox.move();
  theScore();
  randomPointsText();
  yellowPointsText();
  greyPointsText();
}
//..............................................................................................................................................................//

//Creates the array used for the inventory......................................................................................................................//
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
//..............................................................................................................................................................//

//Handles input from keys.......................................................................................................................................//
function keyTyped() {
  if (key === "s") {
    moveDown();
  }
  if (key === "w") {
    moveUp();
  }
  if (key === "a") {
    moveLeft();
  }
  if (key === "d") {
    moveRight();
  }
  if (key === "q") {
    toggleInventory();
  }
  if (key === "e") {
    if (guy === right) {
      if (grid2[playerY-1][playerX+1] === "G") {
        depositGreys();
      }
      if (grid2[playerY-1][playerX+1] === "Y") {
        depositYellows();
      }
      if (grid2[playerY-1][playerX+1] === "O") {
        depositAll();
      }
    }
  }
  if (key === " ") {
    pickupBoxes();
  }
  if (playing === false) {
    music.play();
    music.loop();
    playing = true;
  }
}
//..............................................................................................................................................................//

//Draws the inventory on the canvas.............................................................................................................................//
function displayInventory() {
  for (let y=0; y<inventoryY; y++) {
    for (let x=0; x<inventoryX; x++) {
      if (inventory[y][x] === 1) {
        image(invBox1, x*slotSize, y*slotSize, slotSize,slotSize);
      }
      else if (inventory[y][x] === 2){
        image(invBox2, x*slotSize, y*slotSize, slotSize, slotSize);
      }
      else {
        noFill();
      }
      stroke(1);
      rect(x*slotSize, y*slotSize, slotSize, slotSize);
    }
  }
}
//..............................................................................................................................................................//

//..............................................................................................................................................................//
function player(){
  noStroke();
  noFill();
  image(guy,playerX*spaces,playerY*spaces-spaces, spaces, spaces*2);
  //rect(playerX*spaces,playerY*spaces,spaces,spaces);
}
//..............................................................................................................................................................//

//Creates a class that is used to generate the boxes as objects.................................................................................................//
class Box {
  //Consructs the object.......................................................//
  constructor(x,y,sprite,duration) {
    this.x = x;
    this.alsoX = x;
    this.y = y;
    this.sprite = sprite;
    this.onConveyor = true;
    this.collected = false;
    this.duration = duration;
    this.lastMove = 0;
  }
  //...........................................................................//

  //displays the object........................................................//
  display() {
    noFill();
    noStroke();
    if (this.onConveyor === true) {
      image(this.sprite,this.x*spaces, this.y*spaces, spaces, spaces);
    }
  }
  //...........................................................................//

  //Moves the object on the conveyor...........................................//
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
  //...........................................................................//

  //Resets the position of the object..........................................//
  reset() {
    this.x = this.alsoX;
    console.log(millis());
    this.lastMove = millis() + this.duration;
    this.onConveyor = true;
  }
  //...........................................................................//

}
//..............................................................................................................................................................//

//Displays the score onscreen...................................................................................................................................//
function theScore() {
  stroke(1);
  text("Score: "+score, 50,250);
}
//..............................................................................................................................................................//

//Toggles the inventory.......................................................................................................................................................//
function toggleInventory(){
  showInv = !showInv;
}
//..............................................................................................................................................................//

//Moves the player one space to the right.......................................................................................................................//
function moveRight() {
  guy = right;
  if (grid2[playerY][playerX+1] === "."){
    playerX += 1;
    console.log("X = " + playerX);
  }
}
//..............................................................................................................................................................//

//Moves the player one space to the left........................................................................................................................//
function moveLeft() {
  guy = left;
  if (grid2[playerY][playerX-1] === ".") {
    playerX -=1;
    console.log("X = " + playerX);
  }
}
//..............................................................................................................................................................//

//Moves the player up one space.................................................................................................................................//
function moveUp() {
  guy = back;
  if (grid2[playerY-1][playerX] === ".") {
    playerY -= 1;
    console.log("Y = " + playerY);
  }
}
//..............................................................................................................................................................//

//Moves the player down one space...............................................................................................................................//
function moveDown() {
  guy = front;
  if (grid2[playerY+1][playerX] === ".") {
    playerY += 1;
    console.log("Y = " + playerY);
  }
}
//..............................................................................................................................................................//

//Checks for an empty slot in the inventory, if one is found a box is placed into that slot.....................................................................//
function pickupBoxes() {
  for (let y=0; y<inventoryY; y++) {
    for (let x=0; x<inventoryX; x++) {
      if (inventory[y][x] === 0) {
        if (guy === front) {
          if (yellowBox.x === playerX && yellowBox.y === playerY+1) {
            if (playerX !== 3) {
              yellowBox.onConveyor = false;
              inventory[y][x] = 1;
              yellowBox.reset();
              pickUp.play();
            }
          }
          else if (greyBox.x === playerX && greyBox.y === playerY+2) {
            if (playerX !== 3) {
              greyBox.onConveyor = false;
              inventory[y][x] = 2;
              greyBox.reset();
              pickUp.play();
            }
          }
        }
      }
    }
  }
}
//..............................................................................................................................................................//

//Removes all grey boxes from the inventory and increases the score for each box added..........................................................................//
function depositGreys() {
  for (let y=0; y<inventoryY; y++) {
    for (let x=0; x<inventoryX; x++) {
      if (inventory[y][x] === 2) {
        inventory[y][x] = 0;
        if (score >= 100000) {
          score += 10000;
          greyChange += 10000;
        }
        else if (score >= 10000) {
          score += 1000;
          greyChange += 1000;
        }
        else if (score >= 1500) {
          score += 500;
          greyChange += 500;
        }
        else {
          score += 100;
          greyChange += 100;
        }
        putDown.play();
      }
    }
  }
  scoreTime3 = millis();
}
//..............................................................................................................................................................//

//Removes all yellow boxes from the inventory and increases the score for each box added........................................................................//
function depositYellows() {
  for (let y=0; y<inventoryY; y++) {
    for (let x=0; x<inventoryX; x++) {
      if (inventory[y][x] === 1) {
        inventory[y][x] = 0;
        if (score >= 10000) {
          score += 700;
          yellowChange += 700;
        }
        if (score >= 1000) {
          score += 100;
          yellowChange += 100;
        }
        else if (score >= 500) {
          score += 50;
          yellowChange += 50;
        }
        else {
          score += 10;
          yellowChange += 10;

        }
        putDown.play();
      }
    }
  }
  scoreTime2 = millis();
}
//..............................................................................................................................................................//

//Removes all the boxes in the inventory and gives a random score change between -150 and 150...................................................................//
function depositAll() {
  for (let y=0; y<inventoryY; y++) {
    for (let x=0; x<inventoryX; x++) {
      if (inventory[y][x] === 1 || inventory[y][x] === 2) {
        inventory[y][x] = 0;
        if (score < 1000) {
          randomPoints = Math.floor(random(-150,150));
        }
        else{
          randomPoints = Math.floor(random(-1500,1500));
        }
        score += randomPoints;
        totalChange += randomPoints;
        putDown.play();
      }
    }
  }
  scoreTime1 = millis();
  //console.log(millis());
  //console.log(scoreTime1+2000);
}
//..............................................................................................................................................................///

//Shows the change in score from the depositAll function........................................................................................................//
function randomPointsText() {
  if (totalChange !== 0) {
    if (millis() < scoreTime1 + 2000) {
      fill("yellow");
      text(" "+ totalChange, 21*spaces, 180);

    }
    else {
      totalChange = 0;
    }
  }
}
//..............................................................................................................................................................//

//Shows the change in score from the depositGreys function......................................................................................................//
function yellowPointsText() {
  if (yellowChange !== 0) {
    if (millis() < scoreTime2 + 2000) {
      fill("yellow");
      text("" + yellowChange, 21*spaces, 370);
    }
    else {
      yellowChange = 0;
    }
  }
}
//..............................................................................................................................................................//

//Shows the change in score from the depositYellows function....................................................................................................//
function greyPointsText() {
  if (greyChange !== 0) {
    if (millis() < scoreTime3 + 2000) {
      fill("yellow");
      text("" + greyChange, 21*spaces, 275);
    }
    else {
      greyChange = 0;
    }
  }
}
//..............................................................................................................................................................//

//
