// a rectangular canvas
const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d", { alpha: true });
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize, false);

/////////////// All of our state ///////////////
// 	list of finished paths
let gestures = [];
// the current path being edited (null initially)
let currentGesture = null;
// drawing mode
let isStationary = false;
// mouse state:
let pointer = {
  pos: { x: 200, y: 200 },
  isDown: false,
  // time:
  t: performance.now()
};
// minimum duration of a gesture segment:
let resolution_ms = 10;

//////////////////////////////////////////////////
//// Some useful math:

function length2d(x, y) {
  return Math.sqrt(x * x + y * y);
}

function distance2d(pt0, pt1) {
  return length2d(pt1.x - pt0.x, pt1.y - pt0.y);
}

// toroidal canvas boundaries
function toroidal(pt) {
  // (if a point goes of one side of the canvas,
  // it appears on the opposite side)
  if (pt.x < 0) {
    pt.x += canvas.width;
  } else if (pt.x > canvas.width) {
    pt.x -= canvas.width;
  }
  if (pt.y < 0) {
    pt.y += canvas.height;
  } else if (pt.y > canvas.height) {
    pt.y -= canvas.height;
  }
}

// the line animates
// on every frame,
function animate() {
  for (let gesture of gestures) {
    if (gesture == currentGesture) continue;
    if (gesture.motions.length == 0) continue;

    // the first segment of the line is moved to the end of the line
    let first = gesture.motions.shift();
    if (!gesture.isStationary) {
      // move the start point:
      gesture.start.x += first.dx;
      gesture.start.y += first.dy;
    }
    // gesture.start.t += first.dt

    // jiggle the motion about a bit:
    //let spd = 1;
    //first.dx += spd * (Math.random() - 0.5);
    //first.dy += spd * (Math.random() - 0.5);
    // first.dx *= 0.9;
    // first.dy *= 0.9;

    // add it back on to the end:
    gesture.motions.push(first);
    toroidal(gesture.start);
  }
}

// the ability to draw lines (from line segments)
function draw() {
  // update scene data:
  animate();

  // clear the canvas:
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let g=0; g<gestures.length; g++) {
    let gesture = gestures[g]
    // if there is no data, skip it:
    if (gesture.motions.length < 1) continue;

    // get the start point of this gesture:
    let pt = { x: gesture.start.x, y: gesture.start.y };
    // draw every motion as a line:
    for (let i = 0; i < gesture.motions.length; i++) {
      // get the motion's change
      let { dx, dy, dt } = gesture.motions[i];
      // this established a second point relative to `pt`
      let pt1 = { x: pt.x + dx, y: pt.y + dy };

      // get some properties we can use to stylize the segment:
      let length = length2d(dx, dy);
      let speed = length / dt;
      // what's the distance to the mouse?
      let dist =
        distance2d(pointer.pos, pt) / Math.max(canvas.width, canvas.height);
      // the "phase" goes from 0 to 1 as we work through the path:
      let phase = i / gesture.motions.length;
      // stylize:
      let width = Math.sin(Math.PI * phase) * 0.01 * canvas.width;
      let lightness = 1 - 1 / (1 + speed);
      let saturation = 50;
      let opacity = Math.exp(-10 * dist * dist);
      // set our color
      ctx.strokeStyle = `hsla(${gesture.hue}, ${
        100 * saturation
      }%, ${50}%, ${opacity})`;
      ctx.lineWidth = width;
      ctx.lineCap = "round";

      // finally, draw the path segment from pt to pt1:
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
      ctx.lineTo(pt1.x, pt1.y);
      ctx.stroke();

      // our `pt1` will be the starting `pt` for the next line:
      pt = pt1;
      // wrap in the canvas
      toroidal(pt);
    }

    // if this is running in Max, output the data:
    if (window.max) {
      window.max.outlet("point", g, 
        pt.x / canvas.width, pt.y / canvas.height, 
        dx / canvas.width, dy / canvas.height, 
        phase,
        width
      );
    }
  }
  // if this is running in Max, output the mouse data:
  if (window.max) {
      window.max.outlet("pointer", pointer.pos.x / canvas.width, pointer.pos.y / canvas.height );
    }
  // schedule the next 'draw()' call
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

// pointer gestures, with position and time
canvas.addEventListener(
  "pointerdown",
  function (e) {
    let x = e.clientX;
    let y = e.clientY;
    let t = performance.now();

    currentGesture = {
      start: { x, y, t },
      motions: [],
      isStationary: isStationary,
      t: pointer.t,
      duration: 0,
      hue: Math.random() * 360
    };
    gestures.push(currentGesture);

    // now update the pointer state:
    pointer.pos.x = x;
    pointer.pos.y = y;
    pointer.t = t;
    pointer.isDown = true;
  },
  false
);

window.addEventListener(
  "pointermove",
  function pointermove(e) {
    let x = e.clientX;
    let y = e.clientY;
    let t = performance.now();

    let dx = x - pointer.pos.x;
    let dy = y - pointer.pos.y;
    let dt = t - pointer.t;
    // quantize `dt`
    dt = Math.pow(2, Math.floor(Math.log(dt) / Math.log(2)));

    // when pointer is down, and we have a current gesture:
    if (pointer.isDown && currentGesture) {
      //  use the position of the pointer to add a new point
      // using pointer.pos.x, pointer.pos.y
      currentGesture.motions.push({ dx, dy, dt });
      currentGesture.duration += dt;
    }

    // now update the pointer state:
    pointer.pos.x = x;
    pointer.pos.y = y;
    pointer.t = t;
  },
  false
);

window.addEventListener(
  "pointerup",
  function pointerdown(e) {
    let x = e.clientX;
    let y = e.clientY;
    let t = performance.now();

    console.log(currentGesture);
    // we no longer have a currently-drawing gesture:
    currentGesture = null;

    // now update the pointer state:
    pointer.pos.x = x;
    pointer.pos.y = y;
    pointer.t = t;
    pointer.isDown = false;
  },
  false
);

// key 'c' to clear all paths
// key 'm' to toggle moving mode
window.addEventListener("keydown", (event) => {
  if (event.key == "c") {
    // destroy all paths NOW!
    gestures = [];
    currentGesture = null;
  } else if (event.key == "m") {
    isStationary = !isStationary;
  }
});