let slider;

function setup() {
  const canvas = createCanvas(600, 520);
  canvas.parent('sierpinski-canvas');
  slider = createSlider(0, 7, 3, 1); // min, max, initial, step
  slider.parent('sierpinski-canvas');
  slider.position(10, height + 10);
  noLoop();
}

function draw() {
  background(255);
  let depth = slider.value();

  noFill();
  stroke(214, 0, 0); // Using the site's red color
  strokeWeight(2);

  const h = (sqrt(3) / 2) * width * 0.9;
  const margin = 30;
  
  const a = createVector(width / 2, margin);
  const b = createVector(margin, margin + h);
  const c = createVector(width - margin, margin + h);

  sierpinski(a, b, c, depth);
}

function sierpinski(a, b, c, depth) {
  if (depth === 0) {
    triangle(a.x, a.y, b.x, b.y, c.x, c.y);
    return;
  }

  const ab = p5.Vector.lerp(a, b, 0.5);
  const bc = p5.Vector.lerp(b, c, 0.5);
  const ca = p5.Vector.lerp(c, a, 0.5);

  sierpinski(a, ab, ca, depth - 1);
  sierpinski(ab, b, bc, depth - 1);
  sierpinski(ca, bc, c, depth - 1);
}

function mouseReleased() {
  redraw();
}

function touchEnded() {
  redraw();
} 