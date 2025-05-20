let kochLevel = 0;
let kochMaxLevel = 5;
let kochFrameCounter = 0;
let kochFramesPerLevel = 60;
let kochPoints = [];

function kochSetup() {
    let canvas = createCanvas(400, 120);
    canvas.parent('koch-anim-canvas');
    frameRate(30);
    kochGenerate();
}

function kochDraw() {
    background(255);
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let p of kochPoints) {
        vertex(p.x, p.y);
    }
    endShape();

    kochFrameCounter++;
    if (kochFrameCounter >= kochFramesPerLevel) {
        kochFrameCounter = 0;
        if (kochLevel < kochMaxLevel) {
            kochLevel++;
            kochGenerate();
        } else {
            setTimeout(() => {
                kochLevel = 0;
                kochGenerate();
            }, 1000);
        }
    }
}

function kochGenerate() {
    kochPoints = [];
    let start = createVector(20, height - 20);
    let end = createVector(width - 20, height - 20);
    kochPoints.push(start);
    kochKochCurve(start, end, kochLevel);
    kochPoints.push(end);
}

function kochKochCurve(a, b, level) {
    if (level === 0) {
        // base case: do nothing, just connect a to b
        return;
    }
    let v = p5.Vector.sub(b, a);
    let oneThird = p5.Vector.add(a, p5.Vector.mult(v, 1/3));
    let twoThird = p5.Vector.add(a, p5.Vector.mult(v, 2/3));
    let angle = -PI/3;
    let peak = p5.Vector.add(oneThird, p5.Vector.fromAngle(v.heading() + angle, v.mag()/3));

    kochKochCurve(a, oneThird, level-1);
    kochPoints.push(oneThird);
    kochKochCurve(oneThird, peak, level-1);
    kochPoints.push(peak);
    kochKochCurve(peak, twoThird, level-1);
    kochPoints.push(twoThird);
    kochKochCurve(twoThird, b, level-1);
}

// Per evitare conflitti con altri sketch p5.js, uso istanza p5
new p5((sk) => {
    sk.setup = kochSetup;
    sk.draw = kochDraw;
}); 