// Button OOP Demo

let buttonOne;
let buttonTwo;
let back = "white";

function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonOne = new Button(300, 200, 200, 100);
  buttonTwo = new Button(600, 200, 200, 100);
  buttonTwo.colour1 = "blue";
}

function draw() {
  background(back);
  buttonOne.display();
  buttonTwo.display();
}

function mousePressed() {
  if (buttonOne.checkIfInside(mouseX, mouseY)) {
    back = "red";
  }
  if (buttonTwo.checkIfInside(mouseX, mouseY)) {
    back = "black";
  }
}

class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.colour1 = "green";
    this.colour2 = "red";
  }

  display() {
    if (this.checkIfInside(mouseX, mouseY)) {
      fill(this.colour2);
    }
    else {
      fill(this.colour1);
    }
    rect(this.x, this.y, this.width, this.height);
  }

  checkIfInside(x, y) {
    return x >= this.x && x <=this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
}