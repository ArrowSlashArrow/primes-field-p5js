let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

function min(a, b) {
    return a < b ? a : b
}

let frag_shader;

let RADIUS = min(WIDTH, HEIGHT) / 4;

let total_time = 3600;
let LINE_COUNT = Math.floor(total_time / 15);

let TO_RADIANS = Math.PI / 180;

let font;
function preload() {
    frag_shader = loadShader("shader.vert", "shader.frag");
    font = loadFont('assets/JetBrainsMono-Italic.ttf');
    
}

function setup() {
    createCanvas(WIDTH, HEIGHT, WEBGL);
    background(0);
    frameRate(60);
    stroke(1);
    
    textSize(40);
    textFont(font);
    drawingContext.disable(drawingContext.DEPTH_TEST);
}   

function draw_lines() {
    // get relative time to start and convert it to an angle measurement
    var seconds = millis() / 1000;
    var elapsed_time = (seconds / total_time) % 1;
    console.log(seconds, elapsed_time);
    var angle = elapsed_time * 360 * TO_RADIANS;

    // adjust drawing settings for line
    stroke(255);
    strokeWeight(2);

    
    for (let i = 0; i < LINE_COUNT; i++) { 
        // get all line position arguments
        let x_start = RADIUS * Math.sin(angle * i);
        let y_start = RADIUS * Math.cos(angle * i);
        let x_end = RADIUS * Math.sin(angle * (i + 1));
        let y_end = RADIUS * Math.cos(angle * (i + 1));
        
        line(x_start, y_start, x_end, y_end);
    }

    // adjust drawing settings for text
    textAlign(LEFT, CENTER);
    strokeWeight(4);
    fill(255);
    stroke(0);

    // get current time and convert it to a string  
    let current_time = new Date();
    let time_str = current_time.toLocaleDateString() + " " + current_time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false});
    
    // render the text at the centre of the screen
    text(time_str, -WIDTH / 2 + 20, HEIGHT / 2 - 40)

}

function draw() {
    background(0);
    frag_shader.setUniform("iResolution", [WIDTH, HEIGHT]);
    frag_shader.setUniform("iTime", millis() / 1000);

    push();
    translate(0, 0, -1);
    shader(frag_shader);
    plane(WIDTH, HEIGHT);
    pop();

    push();
    translate(0, 0, -1);
    resetShader();
    draw_lines();
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    WIDTH = windowWidth;
    HEIGHT = windowHeight;

    RADIUS = min(WIDTH, HEIGHT) / 4;
}