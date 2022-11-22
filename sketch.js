const loopDelay = 3 * 1000; // ms
const margin = 0.9;
const animateRate = 0.003;

let k;
let oldSections = [];
let angle;

function makeTriangle(x, y, radius, offset = 0) {
  const points = [];

  for (let angle = 0; angle < TWO_PI; angle += TWO_PI / 3) {
    const pX = x + radius * cos(angle + offset);
    const pY = y + radius * sin(angle + offset);
    points.push([pX, pY]);
  }

  return [
    new Segment(...points[0], ...points[1]),
    new Segment(...points[1], ...points[2]),
    new Segment(...points[2], ...points[0]),
  ];
}

function setup() {
  createCanvas(innerWidth, innerHeight);

  fill("white");
  stroke("white");
  background(20);
  strokeWeight(2);

  reset();
}

function drawSection(sec) {
  line(sec.x1, sec.y1, sec.x2, sec.y2);
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  reset();
}

function restart() {
  noLoop();
  setTimeout(reset, loopDelay);
}

function reset() {
  const constraint = min(width, height) * margin;
  const tri = makeTriangle(width / 2, height / 2, constraint / 2, -HALF_PI);

  k = new Koch(tri);
  oldSections = k.sections;

  animating = false;
  angle = 0;
  oldSections = k.sections;

  loop();
}

let animating = false;

function draw() {
  background(20);
  stroke(255);
  oldSections.forEach((s) => {
    drawSection(s);
  });

  if (!animating) {
    k.fracture();
    animating = true;
    angle = 0;
    if (k.sections.length > 3100) restart();
  }

  stroke(128);
  k.latestPreRotations.forEach((p) => {
    const post1 = rotateLine(p.x1, p.y1, p.x2, p.y2, p.x1, p.y1, angle);
    const post2 = rotateLine(p.x1, p.y1, p.x2, p.y2, p.x2, p.y2, -angle);
    line(...post1);
    line(...post2);
  });
  angle += animateRate;
  if (angle > PI / 3) {
    animating = false;
    angle = 0;
    oldSections = k.sections;
  }
}
