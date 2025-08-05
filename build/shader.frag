precision highp float;

varying vec2 vTexCoord;

uniform vec2 iResolution;
uniform float iTime;

const float LINE_COUNT = 250.0;
const float CYCLE_TIME = 3600.0;
const float PI = 3.14159;
const float TAU = 2.0 * PI;

vec3 random_colour(float seed) {
    float red = mod(seed * 513.432, 256.0);
    float blue = mod(seed * 724.871, 256.0);
    float green = mod(seed * 93.21784, 256.0);
    
    return vec3(red, green, blue) / 256.0;
}

float bitwise_xor(float a, float b) {
    float result = 0.0;
    float power = 1.0;

    for (int i = 0; i < 24; i++) {
        float abit = mod(floor(a / power), 2.0);
        float bbit = mod(floor(b / power), 2.0);
        float xorbit = mod(abit + bbit, 2.0); // XOR: 1 if bits differ
        result += xorbit * power;
        power *= 2.0;
    }

    return result;
}

float is_prime(float n) {
    if (n == 0.0 || n == 1.0) {
        return 0.0;
    }
    
    if (mod(n, 2.0) == 0.0) {
        return 0.0;
    }
    
    float factor = 3.0;
    for (int i = 0; i < 1000000; i++) {
        if (mod(n, factor) == 0.0) {
            return 0.0;
        }
        factor += 2.0;
        if (factor * factor > n) {
            break;
        }
    }
    
    return 1.0;
}

float seed_value(vec2 coordinates) {
    float coord_val = bitwise_xor(coordinates.x + iTime * 60.0, iResolution.y - coordinates.y + iTime * 60.0);
    return is_prime(coord_val) * coord_val;
}

void main() {
    vec2 coords = gl_FragCoord.xy;
    float RADIUS = min(iResolution.x, iResolution.y) / 6.0;
    float multiplier = iTime / CYCLE_TIME * TAU;
    float dist = length((iResolution.xy / 2.0) - coords);
    
    vec4 colour = vec4(random_colour(seed_value(coords)) / (dist / RADIUS / 1.25), 1.0);  
    
    gl_FragColor = colour;
}
