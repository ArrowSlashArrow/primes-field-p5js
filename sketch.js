let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let offset = 0;
let rect_size = 2.718281828459045; // eulers number
let image_offset = 0;

let X_LIM = Math.ceil(WIDTH / rect_size);
let Y_LIM = Math.ceil(HEIGHT / rect_size);

let inverted = false;

    
function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);
  noStroke();

  frameRate(60);
}   

function rand_colour(seed, inverted = false)  {
    if (seed == 0) {return color(0, 0, 0, 255);}
    let red = ((seed * 15) >> 3) % 256;
    let green = ((seed * 85) >> 4) % 256;
    let blue = ((seed * 72) >> 7) % 256;
    if (!inverted) {return color(red, green, blue, 255);}
    return color(255 - red, 255 - green, 255 - blue, 255);
}

function is_prime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;

    // Check divisibility up to the square root of n
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function draw() {
    background(255 * inverted);
    for (let i = -rect_size; i < X_LIM + 1; i++) {
        for (let j = -rect_size; j < Y_LIM + 1; j++) {
            let n = (i + offset) ^ (j + offset + 8704);
            // console.log(n);
            if (is_prime(n)) {
                let col = rand_colour(n, inverted);
                // stroke(col);
                fill(col);
                // point(i, j);
                rect(i * rect_size - (image_offset), j * rect_size - (image_offset), rect_size, rect_size);
            } 
        }
    }
    // if (image_offset === rect_size) {
       offset += 1;
    //    image_offset = 0;
    // } else {
    //     image_offset += 1;
    // }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    WIDTH = windowWidth;
    HEIGHT = windowHeight;
    X_LIM = WIDTH / rect_size;
    Y_LIM = HEIGHT / rect_size;
}

// function keyPressed() {
//     if (keyCode === 73) { // "I" 
//         inverted = !inverted;
//     }
// }