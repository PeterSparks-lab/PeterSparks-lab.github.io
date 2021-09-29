// Interactive Scene
// Peter Sparks
// Date
//
// Extra for Experts:
// - added sounds
// - allowed for window resizing
// - added secret button activated by the mouse wheel button
// - added a pause function




//Declares the necessary variables
let buttaDawg;
let point1X;
let point1Y;
let point2X;
let point2Y;
let point3X;
let point3Y;
let saveScore = [];
let saveBallPos = [];
let saveBallSpeed = [];
let savePlayerPos = [];
let message = "Paused";
let music = false;
let colours;
let r = 150;
let g = 50;
let b = 100;
let playerSpeed = 10;
let diff;
let thePlayers = 1;
let oppSpeed = 10;
let sel;
let sel1;
let sel2;
let sel3;
let theWidth = 100;
let theHeight = 30;
let state = "select";
let radius = 10;
let y;
let x;
let x2;
let y2;
let startX;
let startY;
let x3;
let y3 = 0;
let x4 = 15;
let y4 = 25;
let speedX = 8;
let speedY = 7;
let ele;
let score1 = 0;
let score2 = 0;
let boom;
let count;
let theMusic;
let doge;


function preload(){
  buttaDawg = loadImage("assets/dawgWithTheButta.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  startX = width/2;
  startY = height/2;
  x = startX - theWidth;
  x2 = startX;
  y2  = startY;
  x3 = startX - theWidth;
  textSize(100);
  chooseType();
  point1X = windowWidth-25;
  point1Y = 0;
  point2X = windowWidth-25;
  point2Y = 25;
  point3X = windowWidth;
  point3Y = 13;
  ele = createAudio("assets/blip.wav");
  boom = createAudio("assets/boom.wav");
  theMusic = createAudio("assets/punchout.wav");
  doge = createAudio("assets/dogdoing.wav");
  
}

function draw() {
  //console.log(state);
  background(r,g,b);
  theColours();
  theScore();
  winning();
  winText();
  count = score1 + "-" + score2;
  theText();
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
  secretButton();
  playSound();
  pauseButton();
  clickPauseGame();
  unPauseButton();
  clickUnpauseGame();
  pauseText();
  secondSecret();
  theDog();
}


//resizes the Canvas when the window size is changed
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  startX = width/2;
  startY = height/2;
  x = startX - theWidth;
  x2 = startX;
  y2 = startY;
  x3 = startX - theWidth;
  y2 = startY;
  point1X = windowWidth-25;
  point1Y = 0;
  point2X = windowWidth-25;
  point2Y = 25;
  point3X = windowWidth;
  point3Y = 13;
}


//Draws the player at the bottom of the screen
function player1() {
  if (state === "go" || state === "pause") {
    y = height - theHeight;
    rectMode(CORNER);
    rect(x, y, theWidth, theHeight);
  }
}

//Allows the player to move across the screen
function movePlayer() {
  if (state === "go"){
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
}


// Allows the ball to bounce off walls and players and plays the corresponding sound effect/changes background if needed
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
    state = "go";
    speedY = -speedY;
  }
  if (y2 >= windowHeight - radius) {
    boom.play();
    state = 2;
    x2 = startX;
    y2 = startY;
    score2 += 1;
    state = "go";
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


// Moves the ball
function moveBall() {
  if (state === "go") {
    x2 += speedX;
    y2 += speedY;
  }
}


//Draws the ball
function showBall() {
  if (state === "go" || state === "pause") {
    fill("white");
    noStroke();
    circle(x2, y2, radius * 2);
  }
}

//Starts the game in multiplayer mode
function mouseClicked() {
  if (state === "ready") {
    state = "go";
  }
}

//Displays text to prompt players to start in multiplayer mode
function theText() {
  if (state === "ready") {
    text("Click To Start", width / 2, height/2);
    fill(255);
  }
}


//Draws the second player/opponent at the top of the screen
function player2() {
  if (state === "go" || state === "pause") {
    rectMode(CORNER);
    rect(x3, y3, theWidth, theHeight);
  }
}


//Allows for a second player to move in multiplayer mode
function movePlayer2() {
  if (thePlayers === 2) {
    if (state === "go"){
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
}


//Moves the second player in single player mode
function moveOpp() {
  if (thePlayers === 1) {
    if (state === "go"){
      if (diff === 0) {
        x3 += oppSpeed;
      }
      else if (diff === 1) {
        if (y2 <= height/ 3) {
          if (x2 > x3 + theWidth+5) {
            x3 += oppSpeed;
          }
          else if (x2 < x3) {
            x3 -= oppSpeed;
          }
        //} else {
          //x3 += oppSpeed;
        }
      }
      else if (diff === 2){
        if (y2 <= height/2){
          if(x2 >x3 + theWidth+5){
            x3 += oppSpeed;
          }
          else if (x2 < x3){
            x3-=oppSpeed;
          }
        }
      }
      else if (diff === 3){
        if (x2 > x3 +theWidth){
          x3 += oppSpeed;
        }
        else if (x2 < x3 +5){
          x3 -= oppSpeed;
        }
      }
    }
  }
}


//Allows the opponent to bounce off the walls on easy mode in single player
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


//Displays the current score
function showScore() {
  if (state === "go") {
    text(count, width/2, height/2);
  }
}

// Lets players choose colour or black and white modes
function chooseType(){
  if (state === "select"){
    sel = createSelect();
    sel.position(160, 10);
    sel.option("Choose Game Type");
    sel.option("Basic");
    sel.option("Colour Switch");
    sel.selected("Choose Game Type");
    sel.changed(nextChoice);
  }
}

//Removes the previous selection box and sets the Gamemode based on the choice, 
function nextChoice(){
  let theType = sel.value();
  if (theType === "Basic"){
    colours = false;
  }
  else {
    colours = true;
  }
  choose1();
  sel.remove();
}

//lets players choose single or multiplayer mode
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

//confirms selection/initiates next choice
function gameMode() {
  let players = sel1.value();
  if (players === "Multiplayer") {
    thePlayers = 2;
    state = "ready";
  }
  else {
    //start = -1;
    choose2();
  }
  sel1.remove();
}

//choose difficulty on single player mode
function choose2() {
  sel2 = createSelect();
  sel2.position(160, 10);
  sel2.option("Difficulty");
  sel2.option("No Challenge");
  sel2.option("Normal");
  sel2.option("Hard");
  sel2.option("Impossible");
  sel2.selected("Difficulty");
  sel2.changed(modeGame);
}

//confirms difficulty
function modeGame() {
  let gameDiff = sel2.value();
  if (gameDiff === "No Challenge") {
    diff = 0;
    //oppSpeed = 3;
    state = "go";
  }
  else if (gameDiff === "Normal") {
    diff = 1;
    //oppSpeed = 7;
    state = "go";
  }
  else if (gameDiff === "Hard"){
    diff = 2;
    state = "go";
  }
  else if (gameDiff === "Impossible"){
    diff = 3;
    state = "go";
  }
  sel2.remove();
}

//keeps colours turned off
function theColours(){
  if (!colours){
    r = 0;
    g = 0;
    b = 0;
  }
}

//keeps score
function theScore(){
  if (score1 >= 10 || score2 >= 10){
    state = "win";
  }
}

//win screen background
function winning(){
  if (state === "win"){
    r = 0;
    g = 0;
    b = 0;
  }
}

//displays a win
function winText(){
  let theWinner;
  if ( state === "win"){
    if (score1 >= 10){
      theWinner = "Player 1";
    }
    else if (score2 >= 10){
      theWinner = "Player 2";
    }
    //fil(255);
    text(theWinner +" Wins", width/2, height/2);
    fill(255);
  }
}

//creates a secret button
function secretButton(){
  if (state === "select"){
    if (mouseX >= windowWidth - 25 && mouseY <= 25){
      if (mouseIsPressed){
        if (mouseButton === CENTER){
          state = "secret";
          secretChoice();
        }
      }
    }
  }
}

//activates secret button
function secretChoice(){
  if (state === "secret"){
    sel3 = createSelect();
    sel3.position(300, 10);
    sel3.option("You found the secret button!");
    sel3.option("Copyrighted Music");
    sel3.selected("You found the secret button!");
    sel3.changed(selectMusic);
  }
  
}

//turns on music
function selectMusic(){
  let theSecretChoice = sel3.value();
  if (theSecretChoice === "Copyrighted Music"){
    music = true;
    sel3.remove();
  }
  
}

//plays music
function playSound(){
  if (music === true){
    theMusic.play();
    theMusic.loop(true);
  }
}

//creates pause button
function pauseButton(){
  if (state === "go"){
    fill(255);
    rect(0,0,5,y4);
    rect(10,0,5,y4);
  }

}

//pauses game
function clickPauseGame(){
  if (state === "go"){
    if (mouseX <= 15 && mouseY <= 25){
      if (mouseIsPressed){ 
        if (mouseButton === LEFT){
          saveScore.push(score1);
          saveScore.push(score2);
          saveBallPos.push(x2);
          saveBallPos.push(y2);
          saveBallSpeed.push(speedX);
          saveBallSpeed.push(speedY);
          savePlayerPos.push(x);
          savePlayerPos.push(x3);
          console.log("changing state");
          state = "pause";
        }
      }
    }
  }
}

//creates play button
function unPauseButton(){
  if (state === "pause"){
    triangle(point1X,point1Y,point2X,point2Y,point3X,point3Y);
  }
}

//resumes gameplay
function clickUnpauseGame(){
  if (state === "pause"){
    if (mouseX >= point1X && mouseY <= 25){
      if (mouseIsPressed){
        if (mouseButton === LEFT){
          score1 = saveScore[0];
          score2 = saveScore[1];
          x2 = saveBallPos[0];
          y2 = saveBallPos[1];
          speedX = saveBallSpeed[0];
          speedY = saveBallSpeed[1];
          x = savePlayerPos[0];
          x3 = savePlayerPos[1];
          state = "go";
          savePlayerPos.length = 0;
          saveScore.length = 0;
          saveBallSpeed.length = 0;
          saveBallPos.length = 0;
        }
      }
    }
  }
}

//displays pause message
function pauseText(){
  if (state === "pause"){
    textAlign(CENTER);
    text(message, windowWidth/2, windowHeight/2);
  }

}

//a second secret button
function secondSecret(){
  if (state === "go"){
    if (mouseX >= windowWidth-25 && mouseY >= windowHeight-25){
      if (mouseIsPressed){
        if(mouseButton === CENTER){
          state = "secondSecret";
        }
      }
    }
  }
}

//What is the dog doing?
//displays dog picture
//plays sound effect
function theDog(){
  if (state === "secondSecret"){
    image(buttaDawg, 0, 0, windowWidth, windowHeight);
    doge.play();
  }
}