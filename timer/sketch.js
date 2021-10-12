//Timer OOP Demo

let time;
let n;
function setup() {
  createCanvas(windowWidth, windowHeight);
  time = new Timer(3000);
}

function draw() {
  
  if (time.isDone()) {
    background("white");
  }
  else {
    background("black");
  }
}

class Timer {
  constructor(waitTime) {
    this.waitTime = waitTime;
    this.startTime = millis();
  }

  isDone() {
    return millis() > this.startTime + this.waitTime;
  }

  reset() {
    this.startTime = millis();
  }

  setDuration(waitTime) {
    this.waitTime = waitTime;
  }
}

function mousePressed() {
  time.reset();
}
