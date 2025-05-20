// TURTLE STUFF:
let x, y; // the current position of the turtle
let currentangle = 0; // which way the turtle is pointing
let step = 20; // how much the turtle moves with each 'F'
let angle = 90; // how much the turtle turns with a '-' or '+'

// LINDENMAYER STUFF (L-SYSTEMS)
let thestring = 'A'; // "axiom" or start of the string
let numloops = 5; // how many iterations to pre-compute
let therules = []; // array for rules
therules[0] = ['A', '-BF+AFA+FB-']; // first rule
therules[1] = ['B', '+AF-BFB-FA+']; // second rule

let whereinstring = 0; // where in the L-system are we?

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id('turtle-bg-canvas');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '0');
  canvas.style('pointer-events', 'none');
  background(255, 0);
  stroke(255, 182, 193, 80); // rosa chiaro trasparente

  // start the x and y position at lower-left corner
  x = 0;
  y = height-1;

  // COMPUTE THE L-SYSTEM
  for (let i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255, 0);
  x = 0;
  y = height-1;
  whereinstring = 0;
}

function draw() {
  // draw the current character in the string:
  drawIt(thestring[whereinstring]);

  // increment the point for where we're reading the string.
  // wrap around at the end.
  whereinstring++;
  if (whereinstring > thestring.length-1) whereinstring = 0;
}

// interpret an L-system
function lindenmayer(s) {
  let outputstring = '';
  for (let i = 0; i < s.length; i++) {
    let ismatch = 0;
    for (let j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0])  {
        outputstring += therules[j][1];
        ismatch = 1;
        break;
      }
    }
    if (ismatch == 0) outputstring+= s[i];
  }
  return outputstring;
}

function drawIt(k) {
  if (k=='F') {
    let x1 = x + step*cos(radians(currentangle));
    let y1 = y + step*sin(radians(currentangle));
    stroke(255, 182, 193, 80); // rosa chiaro trasparente
    line(x, y, x1, y1);
    x = x1;
    y = y1;
  } else if (k == '+') {
    currentangle += angle;
  } else if (k == '-') {
    currentangle -= angle;
  }

  // rosa chiaro trasparente
  let r = 255;
  let g = 182;
  let b = 193;
  let a = 40;

  let radius = 0;
  radius += random(0, 15);
  radius += random(0, 15);
  radius += random(0, 15);
  radius = radius / 3;

  fill(r, g, b, a);
  noStroke();
  ellipse(x, y, radius, radius);
} 