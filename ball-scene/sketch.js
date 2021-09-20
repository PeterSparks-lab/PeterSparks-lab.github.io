//Ball Scene

let x, y, radius, ballColor, moveX, moveY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(width);
  y = random(height);
  radius = random(10, 30)
  ballColor = color(random(255),random(255),random(255),random(255));
  moveX = random(-5, 6)
  moveY = random (5, -6)
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function displayBall(){
  fill(ballColor);
  circle(x, y, radius*2,);
}

function moveBall(){
  x += moveX;
  y += moveY;
}