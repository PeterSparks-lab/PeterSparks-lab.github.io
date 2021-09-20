//Ball Scene

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let index=0; index< 30; index++){
    let newBall = {
    x: random(width),
    y: random(height),
     radius: random(5,20),
    dx: random(-6,7),
    dy: random(-6,7),
    color: ('#006989'),
    }
    ballArray.push(newBall);
}
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function moveBall(){
  for(let theBall of ballArray){
    theBall.x += theBall.dx
    theBall.y += theBall.dy
    theBall.dx = random(-6,7)
    theBall.dy = random(-6,7)

  }
}

function displayBall(){
  for(let ball of ballArray){
    noStroke();
    fill(ball.color);
    circle(ball.x, ball.y, ball.radius*2);
  }
}