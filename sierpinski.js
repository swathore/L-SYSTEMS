let currentLevel = 0;
let maxLevel = 7;
let frameCounter = 0;
let framesPerLevel = 60; // Numero di frame per ogni livello

function setup() {
    let canvas = createCanvas(800, 800);
    canvas.parent('sierpinski-canvas');
    frameRate(30); // Velocità dell'animazione
}

function draw() {
    background(255);
    stroke(0); // Colore nero
    strokeWeight(1);
    noFill();

    // Calcola le dimensioni del triangolo principale
    let margin = 10;
    let maxSideByWidth = width - margin * 2;
    let maxSideByHeight = (height - margin * 2) * 2 / Math.sqrt(3);
    let size = Math.min(maxSideByWidth, maxSideByHeight);
    let h = size * (Math.sqrt(3)/2);
    let x1 = width / 2;
    let y1 = (height - h) / 2;
    let x2 = x1 - size / 2;
    let y2 = y1 + h;
    let x3 = x1 + size / 2;
    let y3 = y2;

    // Disegna il triangolo di Sierpinski con il livello corrente
    sierpinski(x1, y1, x2, y2, x3, y3, currentLevel);

    // Gestione dell'animazione
    frameCounter++;
    if (frameCounter >= framesPerLevel) {
        frameCounter = 0;
        if (currentLevel < maxLevel) {
            currentLevel++;
        } else {
            // Ricomincia l'animazione dopo una breve pausa
            setTimeout(() => {
                currentLevel = 0;
            }, 1000);
        }
    }
}

function sierpinski(x1, y1, x2, y2, x3, y3, level) {
    // Disegna sempre il triangolo corrente
    triangle(x1, y1, x2, y2, x3, y3);

    if (level <= 0) return;

    // Calcola i punti medi dei lati
    let x12 = (x1 + x2) / 2;
    let y12 = (y1 + y2) / 2;
    let x23 = (x2 + x3) / 2;
    let y23 = (y2 + y3) / 2;
    let x31 = (x3 + x1) / 2;
    let y31 = (y3 + y1) / 2;

    // Effetto di fade-in per i nuovi triangoli
    let alpha = map(frameCounter, 0, framesPerLevel, 0, 255);
    stroke(0, alpha); // Colore nero con trasparenza

    // Ricorsione per i tre triangoli più piccoli
    sierpinski(x1, y1, x12, y12, x31, y31, level - 1);
    sierpinski(x12, y12, x2, y2, x23, y23, level - 1);
    sierpinski(x31, y31, x23, y23, x3, y3, level - 1);
} 