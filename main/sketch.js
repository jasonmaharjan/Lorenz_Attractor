var canvas;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  // var CENTER_Y = (windowHeight - height) / 2; 
  canvas.position(x, 110);
}

// Inital Parameters of the Lorenz system
let x = 0.01;
let y = 0;
let z = 0;

// Constants
let a = 10;
let b = 28;
let c = 8.0 / 3.0;

let points_array = new Array();

function setup() {
  canvas = createCanvas(1400, 650, WEBGL);
  colorMode(RGB);
  centerCanvas();
}

function draw() {
  background(5);
  let dt = 0.01;
  let dx = a * (y - x) * dt;
  let dy = (x * (b - z) - y) * dt;
  let dz = (x * y - c * z) * dt;

  x = x + dx;
  y = y + dy;
  z = z + dz;

  // Store each vector(x, y, z) in the vector array
  points_array.push(new p5.Vector(x, y, z));
  
  rotateY(millis() / 1000);
  scale(6);
  noFill();

  beginShape();
    // plot vectors from the points_array
    for (let vector of points_array) {
      stroke(255, 89, 0);
      vertex(vector.x, vector.y, vector.z);
    }
  endShape();  
}

function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}

function windowResized() {
  centerCanvas();
}
