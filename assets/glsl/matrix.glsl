// shaders/matrix.glsl
precision mediump float;

uniform float time;
uniform vec2 resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
  gl_FragColor = vec4(color, 1.0);
}