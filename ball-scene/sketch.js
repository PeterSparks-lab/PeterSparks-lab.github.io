//Ball Scene

let x, y, speed, radius, ballColor, moveX, moveY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(width);
  y = random(height);
  radius = random(10, 30)
  ballColor = color(random(255),random(255),random(255),random(255));
  moveX = random(-4, 5)
  moveY = random (4, -5)
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