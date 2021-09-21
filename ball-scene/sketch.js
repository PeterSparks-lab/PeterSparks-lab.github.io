//Ball Scene

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let index = 0; index < 30; index++){
    spawnBall();
  }

  //spawn a ball every 0.5 seconds
  window.setInterval(spawnBall, 500);

}

function spawnBall(){
    let newBall = {
    x: random(width),
    y: random(height),
     radius: random(5,20),
    dx: random(-5,5),
    dy: random(-5,5),
    color: color(random(255),random(255),random(255),random(255)),
    xTime: 0,
    yTime: 100,
    timeChange: random(0.001,0.01),
    };
    ballArray.push(newBall);
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function mousePressed(){
  spawnBall();
  ballArray[ballArray.length - 1].x = mouseX;
  ballArray[ballArray.length - 1].y = mouseY;
}

function moveBall(){
  for(let theBall of ballArray){
    // theBall.x += theBall.dx
    // theBall.y += theBall.dy
    // theBall.dx = random(-6,7)
    // theBall.dy = random(-6,7)

    theBall.x = noise(theBall.xTime)*width;
    theBall.y = noise(theBall.yTime)*height;

    theBall.xTime += theBall.timeChange;
    theBall.yTime += theBall.timeChange;

  }
}

function displayBall(){
  for(let ball of ballArray){
    noStroke();
    fill(ball.color);
    circle(ball.x, ball.y, ball.radius*2);
  }
}