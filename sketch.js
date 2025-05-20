let axiom = 'F';
let rules = {
    'F': 'F[+F]F[-F]F'
};
let iterations = 0;
let angle = 30;
let length = 100;

// Turtle Geometry variables
let turtleCommands = 'F+F-F-F+F';
let turtleAngle = 90;
let turtleLength = 50;
let turtleCanvas;

// Sierpinski Triangle variables
let sierpinskiAxiom = 'A';
let sierpinskiRules = {
    'A': 'B-A-B',
    'B': 'A+B+A'
};
let sierpinskiIterations = 0;
let sierpinskiAngle = 60;
let sierpinskiLength = 20;
let sierpinskiCanvas;

function setup() {
    // Create canvas for L-System
    let canvas = createCanvas(400, 400);
    canvas.parent('tree-canvas');
    angleMode(DEGREES);
    
    // Create canvas for Turtle Geometry
    turtleCanvas = createCanvas(400, 400);
    turtleCanvas.parent('turtle-canvas');
    
    // Create canvas for Sierpinski Triangle
    sierpinskiCanvas = createCanvas(400, 400);
    sierpinskiCanvas.parent('sierpinski-turtle-canvas');
}

function draw() {
    // Draw L-System
    let treeCanvas = select('#tree-canvas canvas');
    if (treeCanvas) {
        treeCanvas.drawingContext.clearRect(0, 0, width, height);
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
    
    // Draw Turtle Geometry
    let turtleCanvas = select('#turtle-canvas canvas');
    if (turtleCanvas) {
        turtleCanvas.drawingContext.clearRect(0, 0, width, height);
        background(18, 18, 18);
        stroke(255);
        strokeWeight(1.5);
        
        // Draw turtle path
        push();
        translate(width/2, height/2);
        let currentAngle = 0;
        
        for (let i = 0; i < turtleCommands.length; i++) {
            let char = turtleCommands[i];
            
            switch(char) {
                case 'F':
                    line(0, 0, 0, -turtleLength);
                    translate(0, -turtleLength);
                    break;
                case '+':
                    rotate(turtleAngle);
                    break;
                case '-':
                    rotate(-turtleAngle);
                    break;
            }
        }
        pop();
    }
    
    // Draw Sierpinski Triangle
    let sierpinskiCanvas = select('#sierpinski-turtle-canvas canvas');
    if (sierpinskiCanvas) {
        sierpinskiCanvas.drawingContext.clearRect(0, 0, width, height);
        background(18, 18, 18);
        stroke(255);
        strokeWeight(1);
        
        // Generate Sierpinski sequence
        let sequence = sierpinskiAxiom;
        for (let i = 0; i < sierpinskiIterations; i++) {
            let newSequence = '';
            for (let j = 0; j < sequence.length; j++) {
                let char = sequence[j];
                newSequence += sierpinskiRules[char] || char;
            }
            sequence = newSequence;
        }
        
        // Draw Sierpinski sequence
        push();
        translate(width/2, height/2);
        let currentAngle = 0;
        
        for (let i = 0; i < sequence.length; i++) {
            let char = sequence[i];
            
            switch(char) {
                case 'A':
                case 'B':
                    line(0, 0, 0, -sierpinskiLength);
                    translate(0, -sierpinskiLength);
                    break;
                case '+':
                    rotate(sierpinskiAngle);
                    break;
                case '-':
                    rotate(-sierpinskiAngle);
                    break;
            }
        }
        pop();
    }
}
