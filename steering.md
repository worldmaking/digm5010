# Steering Behaviours

---youtube:V4f_1_r80RY

![Fish](http://underthecblog.files.wordpress.com/2014/02/fishschool.gif)

In the late 1980s Craig Reynolds proposed a model of animal motion to model flocks, herds and schools, which he named boids. Reynolds' paper [Steering Behaviors for Autonomous Characters](https://www.red3d.com/cwr/steer/gdc99/) covers boids as an aggregate of other steering behaviours. The paper has been very influential in robotics, game design, special effects and simulation, and remains well worth exploring as a collection of patterns for autonomous agent movements, so we will work through it in more detail.

[Flock simulation example](https://codepen.io/grrrwaaa/full/XXevBb)

[Another](https://codepen.io/grrrwaaa/full/GRqWxMx)

## Reynold's three layers

The paper breaks agent movement in general into three layers:

- **Action Selection**: selecting actions to perform according to environmental input and goals to achieve.
- **Steering**: path determination according to the action selected. Many different behaviors can be used; the essential strategy is to compute a new force, which is often in terms of a desired velocity minus current velocity
- **Locomotion**: mechanisms of conversion of steering into actual movement.

His paper concentrates on several different steering algorithms. Action selection is not dealt with, as it is considered independent. Locomotion is extremely simple -- equivalent to a single force vector on a point mass -- but a more complex (and thus constrained) locomotion system could be swapped in without changing the steering model significantly. Many ideas for combining different steering force behaviours are given. 

> Notice that in the "related work" section the paper refences Grey Walter's Tortoises, Rodney Brooks' robotics, and Valentino Braitenberg's Vehicles.

## Vectors

The simple vehicle model, and all of the behaviours, make use of vectors -- representing positions in space, relative distances, velocities, forces and accelerations etc.  We might need to add, subtract, scale, rotate, randomize etc. vectors. We could write a set of routines to do these things, or we could make use of an existing library such as [gl-matrix](https://glmatrix.net/docs/module-vec2.html).

> In the Codepen JS tab, click the settings wheel to open up the JS settings. Search for "gl-matrix" in the "External scripts" "Search CDNjs" section, and select the "gl-Matrix" option. It will add the gl-matrix library to your script, e.g. "https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/3.4.2/gl-matrix-min.js"

A quick "cheat-sheet" of `vec2` (writing your own cheat sheets is a great way to keep notes on a library, API, SDK etc.)

```js
let { vec2 } = glMatrix;

// vectors are stored in array form as [x, y]
let v = vec2.create() // [0, 0]
let v2 = vec2.clone(v)

// most operations have an "out" argument first
v3 = [0, 0];
vec2.add(v3, v1, v2); // v3 = v1 + v2
// or simply:
v3 = vec2.add([0, 0], v1, v2);
vec2.sub(out, a, b); // out = a - b
vec2.mul(out, a, b);
vec2.div(out, a, b);
vec2.scale(out, a, n); // out[0] = n * a[0]; out[1] = n * a[1]
vec2.negate(out, a); // out[0] = -a[0]; out[1] = -a[1]

vec2.set(out, x, y); // out[0] = x; out[1] = y
vec2.copy(out, a); // out[0] = a[0]; out[1] = a[1]

// length of vector:
let d = vec2.length(a);
// distance between two points
let d = vec2.distance(a, b); 

// set "out" to rotation of "a" by "angle" around "origin":
vec2.rotate(out, a, origin, angle);

// make vector length equal 1, no change of direction
vec2.normalize(out, a);
// linear interpolation, a mix or blend along line between a (when t=0) and b (when t=1)
vec2.lerp(out, a, b, t); 
// place "out" at a random point on a circle of radius "r"
vec2.random(out, r)
```
[More cheat-sheets for gl-matrix](https://github.com/worldmaking/worldmaking.github.io/wiki/JS-Canvas,-Vector,-Matrix-etc.-notes)

## Locomotion

- Acceleration = force / mass  (we often assume mass=1 for simplicity)
	- Limit magnitude of acceleration as pseudo-friction
	- (Or, accel = (old accel * inertia) + force)
- Velocity += acceleration
	- Limit to max speed
- Position += velocity
	- Limit or wrap in space?

position, velocity, acceleration, force can all be represented as `vec2`

Start with something simple -- a single agent, moving in space by a velocity, then by acceleration, then with a simple force (e.g. downward)

We may need to write our own function to limit a vector's length (for  velocity limit, force limit etc.). E.g. get the length of the vector, limit it using Math.min(), and scale the vector by however much you reduced the length:

```js 
// limit the length of vector `v` to be no greater than `limit`
function vec2_maxlength(out, v, limit) {
  const len = vec2.length(v);
  const limited_len = Math.min(len, limit);
  vec2.scale(out, v, limited_len / len);
  return out;
}
```

Perhaps it is a good idea to script a simple sketch with locomoting agents before going further.

Perhaps we should start from pseudocode?

## Steering

Now all we need to do is work out the force, which can be a sum of multiple forces, external and internal

- Global direction, e.g. gravity, wind
- Random walks
- Seek & flee: derive desired velocity from the relative vector toward (or away from) a target point. Given a desired velocity, the steering force is obtained by subtracting the current velocity. Intensity decreases as distance decreases. 
  - Perhaps the desired/feared point is the mouse?
- Avoidance (e.g. avoiding obstacles, and/or each other): intensity increases as relative distance decreases.

It may be better to separate force calculation and locomotion into different loops over the population. Why would that be?

What to do for force calculations around the edges? If you want to have a 'toroidal' space, where exiting one edge means re-entering at the opposite edge, you may need to compute relative position vectors wrapped in a range of -canvas.width/2 to +canvas.width/2. For example:

```js
// wrap vector `v` in the region of [-w/2, -h/2] to [w/2, h/2]
function vec2_relativewrap(out, v, w, h) {
  out[0] = ((((v[0] + w / 2) % w) + w) % w) - w / 2;
  out[1] = ((((v[1] + h / 2) % h) + h) % h) - h / 2;
  return out;
}
```

## UI

We're starting to get more parameters, and it would be nice to be able to tweak them to see how it changes behviours. For a quick solution, search for the "dat-gui" library in the JS extensions. [Here's the API docs](https://github.com/dataarts/dat.gui/blob/master/API.md). Cheatsheet:

```js
// an container of parameters to control:
let params = {
	speed: 1
}

// create the interface:
let gui = new dat.GUI({name: 'My GUI'});
// add a slider for params.speed, in the range of 0 to 10, stepping in 1's
gui.add(params, 'speed', 0, 10, 1);
```

(If it doesn't show up, it might be because of the CSS setting: if you have `* { overflow: hidden; }` change it to `body { overflow: hidden; }`)

## Boids, flocking, swarms

Reynolds' most significant contribution combined several steering forces to a proposed model of animal motion emulating flocks, herds and schools. Each agent, or **"boid"**, follows a set of rules based on simple principles:

- **Avoidance**: Move away from other boids that are too close (avoid collision)
- **Center**: Move toward the center of the flock (avoid exposure)
	- The force depends on the average location of neighbors, relative to the agent.
- **Alignment**: Fly in the same general direction as other nearby boids
	- The force depends on the average velocity of neighbors.

First, we need to scale up from one agent to a population -- just as we did before, using an array (list) of agents, and looping over them to update, move, draw, etc. 

Computing the forces means we need to compare each boid to every other. The simplest way is a nested loop (be careful not to compare to self). There are more efficient ways, but they can be complex, and for small numbers of boids do not make much difference.  

To make this more realistic, we can consider that each boid can only perceive other boids within a certain distance, and possibly also limited viewing angle. Take care for the case where no neighbors are found.

The average of a set of vectors is just the sum of the vectors divided by the number of vectors.

In addition we might want to add a random walk force, especially so that boids that can't see anyone else have some life to them.

Play around with different weights for the forces and limits (e.g. via a dat.gui interface) to understand the ranges of behaviour.

Reynolds says: 
- "for better control it is helpful to first normalize the three steering components, and then to scale them by three weighting factors before summing them." 
- suggests using different neighborhood areas for each force. 
- the avoidance rule might need to take precedence over the other rules. 

## Ideas for extensions

- Adding obstacles to the space, which also trigger avoidance forces, can make behaviours more interesting.
- Gary Flake also recommends adding an influence for View: to move laterally away from any boid blocking the view.
- Adding a "predator" agent to the space, and giving an "evasion" force to each of the boids to run away from the predator. 
- Adding a "leader" object, which triggers seek forces in boids, allows for guided flocks.
- We could visualize the neighbor connections between boids. 

### Trails

We could also visualize trails of where boids have gone, much as was done for Casey Reas' famous works. 

There's a couple of different ways we could do this. One is to store paths each agent has gone into memory, and redraw these paths on every frame, just like we stored and redrawed the paths in Yellowtail. 

Another way is to create a secondary canvas to draw into, one that exists "in memory" rather than in our HTML page, and which is more persistent (much like our first drawing sketches), which we can then draw into our background on each animation frame. We can create an additional canvas like this:

```js
const trailCanvas = document.createElement("canvas");
const trailCtx = turtleCanvas.getContext("2d");
```

Make it match the main canvas size with

```js
trailCanvas.width = canvas.width;
trailCanvas.height = canvas.height;
```

Draw into this canvas using `trailCtx` instead of our usual main canvas context, using the same kinds of routines (e.g. `trailCtx.beginPath()` etc.)

In the draw loop, after clearing our main canvas, we can draw in our offscreen trail canvas with `ctx.drawImage(trailCanvas, 0, 0);`

## Intelligence

So far there is only a kind of primal, almost physical intelligence. How can we introduce a higher level of intelligence -- perhaps the "action selection" suggested by Reynolds, or something else?

- We can add a social behaviour -- perhaps neighbors like to become the same hue, while loners randomize their hue more. Perhaps the weights of cohesion, alignment and avoidance vary with the hue?
- Reynolds talks near the end of the paper about prioritizing different forces at different times. This could be somewhat randomized, or could be the beginning of action selection intelligence. We could, for example, adapt our turtle-program system to the selection of different actions over time, perhaps setting different force weights or enabling and disabling seek/flee/etc. behaviours.
- What about the Braitenberg Vehicles -- can any of those ideas be incorporated here?


## Vehicles

What are these Braitenberg vehicles that keep getting mentioned?

![vehicle](img/Braitenberg_Vehicle_2ab.png)

[Braitenberg, V. (1984). Vehicles: Experiments in synthetic psychology. Cambridge, MA: MIT Press.](https://mitpress.mit.edu/books/vehicles)

> A Braitenberg vehicle is an agent that can autonomously move around. It has primitive sensors (measuring some stimulus at a point) and wheels (each driven by its own motor) that function as actuators or effectors. A sensor, in the simplest configuration, is directly connected to an effector, so that a sensed signal immediately produces a movement of the wheel. Depending on how sensors and wheels are connected, the vehicle exhibits different behaviors (which can be goal-oriented).  [wikipedia](http://en.wikipedia.org/wiki/Braitenberg_vehicle)

[Examples of the first couple of vehicles in a browser-based environment](https://www.braitenberg.world/) -- but please read the book, because they get a lot stranger and more interesting!

> Cyberneticist Valentino Braitenberg argues that his extraordinarily simple mechanical vehicles manifest behaviors that appear identifiable as fear, aggression, love, foresight, and optimism. The vehicle idea was a thought experiment conceived to show that complex, apparently purposive behaviour did not need to depend on complex representations of the environment inside a creature or agents brain. In fact simply by reacting to the environment in a consistent manner was more than enough to explain the low level reactive behaviours exhibited by many animals.

[This book is quite short, but richly dense.](https://drive.google.com/file/d/1FcBQEl6E3hvNy3q-ow4HaFn2jtOPaxvA)

