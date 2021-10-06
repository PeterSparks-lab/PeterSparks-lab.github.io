//Walker OOP Demo

let blake;
let athiela;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blake = new Walker(width/2,height/2,"blue");
  athiela = new Walker(20,80,"red");
}

function draw() {
  //background(220);
  blake.display();
  blake.move();
  athiela.display();
  athiela.move();
}

class Walker {
  constructor(x,y,theColor) {
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 4;
    this.radius = 1;
  }
  display() {
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    let theChoice = random(100);

    if (theChoice < 25) {//up
      if (this.y - this.speed >=0) {
        this.y -= this.speed;

      }
    }
    else if (theChoice < 50) {//down
      if (this.y + this.speed <= height) {

        this.y += this.speed;
      }
    }
    else if (theChoice < 75) {//left
      if (this.x - this.speed >=0) {
        this.x -= this.speed;

      }
    }
    else {//right
      if (this.x + this.speed <= width) {
        this.x += this.speed;

      }
    }
  }
}