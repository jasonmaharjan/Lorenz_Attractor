var canvas;

function centerCanvas() {
  // var CENTER_X = (windowWidth - width) / 2;
  // var CENTER_Y = (windowHeight - height) / 2; 
  canvas.position(50, 110);
}

// Inital Parameters of the Lorenz system
let x = 0.8;
let y = 0;
let z = 0;

// Constants
let a = 10;
let b = 28;
let c = 8.0 / 3.0;

let points_array = new Array();

function setup() {
  canvas = createCanvas(1000, 640, WEBGL);
  colorMode(HSB);
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

  translate(0, 0, -70);
  let angle = 0;
  scale(4);
  stroke(255);
  noFill();
  rotateX(angle);
  angle += 0.25;

  let hue = 0;
  beginShape();
    // plot vectors from the points_array
    for (let vector of points_array) {
      //stroke(hue, 255, 255);
      stroke("yellow");
      vertex(vector.x, vector.y, vector.z);

      // change hue for every vertex
      //hue += 1;
      //if (hue > 255) {
      //  hue = 0; // reset hue
      //}
    }
  endShape();

  let camX = map(mouseX, 0, width, -1536, 1536);
    let camY = map(mouseY, 0, height, -788, 788);
    camera(camX, camY, (height / 2.0) / tan((PI * 30.0) / 180.0), 0, 0, 0, 0, 1, 0);
}

function rotation() {
    // for 3D camera movement
    let camX = map(mouseX, 0, width, -1536, 1536);
    let camY = map(mouseY, 0, height, -788, 788);
    camera(camX, camY, (height / 2.0) / tan((PI * 30.0) / 180.0), 0, 0, 0, 0, 1, 0);
}

function xy() {
  camera(0, 0, (height / 2.0) / tan((PI * 30.0) / 180.0), 0, 0, 0, 1, 0, 0);
}

function yz() {
  camera(500, 200, 0, (windowWidth - width) / 2, (windowHeight - height) / 2, 0, 1, 0, 0);
}

function xz() {
  camera(500, 200, 0, (windowWidth - width) / 2, (windowHeight - height) / 2, 0, 1, 0, 0);
}

function windowResized() {
  centerCanvas();
}
