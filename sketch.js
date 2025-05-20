let axiom = 'F';
let rules = {
    'F': 'F[+F]F[-F]F'
};
let iterations = 0;
let angle = 30;
let length = 100;

function setup() {
    // Create canvas
    let canvas = createCanvas(400, 400);
    canvas.parent('tree-canvas');
    angleMode(DEGREES);
}

function draw() {
    background(18, 18, 18);
    stroke(255);
    strokeWeight(1.5);
    
    // Generate sequence
    let sequence = axiom;
    for (let i = 0; i < iterations; i++) {
        let newSequence = '';
        for (let j = 0; j < sequence.length; j++) {
            let char = sequence[j];
            newSequence += rules[char] || char;
        }
        sequence = newSequence;
    }
    
    // Draw sequence
    push();
    translate(width/2, height);
    let stack = [];
    
    for (let i = 0; i < sequence.length; i++) {
        let char = sequence[i];
        
        switch(char) {
            case 'F':
                line(0, 0, 0, -length);
                translate(0, -length);
                break;
            case '+':
                rotate(angle);
                break;
            case '-':
                rotate(-angle);
                break;
            case '[':
                stack.push({
                    x: x,
                    y: y,
                    angle: angle
                });
                break;
            case ']':
                let state = stack.pop();
                x = state.x;
                y = state.y;
                angle = state.angle;
                break;
        }
    }
    pop();
}
