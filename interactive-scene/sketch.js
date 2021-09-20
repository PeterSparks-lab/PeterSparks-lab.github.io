// Interactive Scene
// Peter Sparks
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//let backgroundColour = 'black';
let colours;
let r = 150;
let g = 50;
let b = 100;
let playerSpeed = 5;
let diff;
let thePlayers = 1;
let oppSpeed = 5;
let sel1;
let sel2;
let theWidth = 100;
let theHeight = 30;
let state = 'select';
let radius = 10;
let y;
let x;
let x2;
let y2;
let startX;
let startY;
let x3;
let y3 = 0;
let speedX = 3;
let speedY = 2;
let ele;
let score1 = 0;
let score2 = 0;
let boom;
let count;


function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER)
  startX = width/2;
  startY = height/2;
  x = startX - theWidth;
  x2 = startX;
  y2  = startY;
  x3 = startX - theWidth;
  textSize(100);
  ele = createAudio("assets/blip.wav");
  boom = createAudio("assets/boom.wav");
  //choose1();
  chooseType();
}

function draw() {
  background(r,g,b);
  theColours();
  theScore();
  winning();
  winText();
  count = score1 + "-" + score2;
  theText();
  //choose2();
  player1();
  player2();
  moveBall();
  bounce();
  showBall();
  movePlayer();
  movePlayer2();
  showScore();
  moveOpp();
  bounceOpp();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  startX = width/2;
  startY = height/2;
  x = startX - theWidth;
  x2 = startX;
  y2 = startY;
  x3 = startX - theWidth;
  y2 = startY;
}

function player1() {
  if (state === 'go') {
    y = (height - theHeight)
    rectMode(CORNER);
    rect(x, y, theWidth, theHeight);
  }
}

function movePlayer() {
  if (x >= 0) {
    if (keyIsDown(65)) {
      x -= playerSpeed;
    }
  }
  if (x <= windowWidth - theWidth) {
    if (keyIsDown(68)) {
      x += playerSpeed;
    }
  }
}

function bounce() {
  if (x2 >= windowWidth - radius || x2 <= 0 + radius) {
    speedX = -speedX;
    ele.play();
    if (colours){
      r = random(0,150);
      g = random(0,150);
      b = random(0,150);
    }
  }
  if (y2 <= 0 + radius) {
    boom.play();
    state = 2;
    x2 = startX;
    y2 = startY;
    score1 += 1;
    state = 'go';
    speedY = -speedY;
  }
  if (y2 >= windowHeight - radius) {
    boom.play();
    state = 2;
    x2 = startX;
    y2 = startY;
    score2 += 1;
    state = 'go';
    speedY = -speedY;
  }
  if (x2 > x && x2 < x + theWidth && y2 > y && y2 < y + theHeight) {
    speedY = -speedY;
    ele.play();
    if (colours){
      r = random(0,150);
      g = random(0,150);
      b = random(0,150);
    }
  }
  if (x2 > x3 && x2 < x3 + theWidth && y2 > y3 && y2 < y3 + theHeight) {
    speedY = -speedY;
    ele.play();
    if (colours){
      r = random(0,150);
      g = random(0,150);
      b = random(0,150);
    }
  }
}

function moveBall() {
  if (state === 'go') {
    x2 += speedX;
    y2 += speedY;
  }
}

function showBall() {
  if (state === 'go') {
    fill("white");
    noStroke();
    circle(x2, y2, radius * 2);
  }
}
function mouseClicked() {
  if (state === 'ready') {
    state = 'go';
  }
}

function theText() {
  if (state === 'ready') {
    text("Click To Start", (width / 2), (height/2));
    fill(255);
  }
}

function player2() {
  if (state === 'go') {
    rectMode(CORNER);
    rect(x3, y3, theWidth, theHeight);
  }
}

function movePlayer2() {
  if (thePlayers === 2) {
    if (x3 >= 0) {
      if (keyIsDown(LEFT_ARROW)) {
        x3 -= playerSpeed;
      }
    }
    if (x3 <= windowWidth - theWidth) {
      if (keyIsDown(RIGHT_ARROW)) {
        x3 += playerSpeed;
      }
    }
  }
}

function moveOpp() {
  if (thePlayers === 1) {
    if (diff === 0) {
      x3 += oppSpeed;
    } else if (diff === 1) {
      if (y2 <= (height/ 3)) {
        if (x2 > x3 + theWidth+5) {
          x3 += oppSpeed;
        } else if (x2 < x3) {
          x3 -= oppSpeed;
        }
      //} else {
        //x3 += oppSpeed;
      }
    } else if (diff === 2){
      if (y2 <= (height/2)){
        if(x2 >x3 + theWidth+5){
          x3 += oppSpeed;
        } else if (x2 < x3){
          x3-=oppSpeed;
        }
      }
    } else if (diff === 3){
      if (x2 > x3 +theWidth){
        x3 += oppSpeed;
      } else if (x2 < x3 +5){
        x3 -= oppSpeed;
      }
    }
  }
}

function bounceOpp() {
  if (thePlayers === 1) {
    if (diff === 0) {
      if (x3 <= 0) {
        oppSpeed = -oppSpeed;
      }
      if (x3 >= windowWidth - theWidth) {
        oppSpeed = -oppSpeed;
      }
    }
  }
}

function showScore() {
  if (state === 'go') {
    text(count, (width/2), (height/2));
  }
}

function chooseType(){
  if (state === 'select'){
    sel = createSelect();
    sel.position(160, 10);
    sel.option('Choose Game Type');
    sel.option('Basic');
    sel.option('Colour Switch');
    sel.selected('Choose Game Type');
    sel.changed(nextChoice);
  }
}

function nextChoice(){
  let theType = sel.value();
  if (theType === 'Basic'){
    colours = false;
  }
  else {
    colours = true;
  }
  choose1();
  sel.remove();
}

function choose1() {
    sel1 = createSelect();
    sel1.position(10, 10);
    sel1.option("Choose Gamemode");
    sel1.option("Single Player");
    sel1.option("Multiplayer");
    sel1.selected("Choose Gamemode");
    //sel1.disable('Single Player');
    sel1.changed(gameMode);
}

function gameMode() {
  let players = sel1.value();
  if (players === "Multiplayer") {
    thePlayers = 2;
    state = 'ready';
  } else {
    //start = -1;
    choose2();
  }
  sel1.remove();
}

function choose2() {
  sel2 = createSelect();
  sel2.position(160, 10);
  sel2.option("Difficulty");
  sel2.option("No Challenge");
  sel2.option("Normal");
  sel2.option("Hard");
  sel2.option('Impossible');
  sel2.selected("Difficulty");
  sel2.changed(modeGame);
}

function modeGame() {
  let gameDiff = sel2.value();
  if (gameDiff === "No Challenge") {
    diff = 0;
    //oppSpeed = 3;
    state = 'go';
  } else if (gameDiff === "Normal") {
    diff = 1;
    //oppSpeed = 7;
    state = 'go';
  } else if (gameDiff === "Hard"){
    diff = 2;
    state = 'go';
  } else if (gameDiff === "Impossible"){
    diff = 3;
    state = 'go';
  }
  sel2.remove();
}

function theColours(){
  if (!colours){
    r = 0;
    g = 0;
    b = 0;
  }
}

function theScore(){
  if (score1 >= 10 || score2 >= 10){
    state = 'win'
  }
}
function winning(){
  if (state === 'win'){
    r = 0;
    g = 0;
    b = 0;
  }
}

function winText(){
  let theWinner;
  if ( state === 'win'){
    if (score1 >= 10){
      theWinner = 'Player 1'
    }
    else if (score2 >= 10){
      theWinner = 'Player 2'
    }
  //fil(255);
  text(theWinner +' Wins', (width/2), (height/2));
  fill(255);
  }
}