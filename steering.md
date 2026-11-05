# Reproducing Research: Tortoises, Vehicles and Flocks

One of the most timely topics of focus today is that of machine learning and artificial intelligence, and particularly now the cohabitation of human/biological and machine agents and intelligences in the world.

For instance, York University recently established [The Center for AI & Society](https://www.yorku.ca/research/cais/) organized research unit, and was awarded $80M from federal funding for the [Connected Minds](https://www.yorku.ca/research/connected-minds/) program, whose aims include:
- "Neural and Machine Systems for a Healthy, Just Society"
- "Understand how the interplay of humans and intelligent technologies produces unexpected, emergent properties at the community/whole society levels"
- "Conducting research on promoting a healthy, resilient, and just techno-social collective"
- "Investigating the different scales of social interaction, from the smallest cellular and algorithmic processes involved in individual behaviour to complete social networks comprising both humans and machines."
- "How human brain function changes when people interact with AI versus each other"
- "Explorations into a more inclusive metaverse"
- and more

There are many multidisciplinary projects funded through this, for which you might be hired as research assistants. There are also scholarships for graduate students (and post-doctroral research appointments) through this, to which you may apply.

> Where and how can *our field* contribute to this? Where does this overlap or intersect with *your* research interests? How would you articulate this?

## Foundations

For the purposes of our DIGM5010 course: what are some of the **foundations** of our field that may inform this? Let's start by tracing this back through a selective history of human and machine societies and cohabitation.

<iframe src="agents.html" title="Tortoises, turtles, robot flocks and vehicle societies" width=100% height=100%></iframe>

## References

- [Papert, Seymour A. Mindstorms (Excerpts)](https://drive.google.com/drive/folders/1nUFDBRNpvKXp3-JiYwBIuN0a55T4vb-Y)
- [Alan Kay. Marvin Minsky & The Ultimate Tinkertoy](https://tinlizzie.org/tinkertoy/) -- with an embedded explorable
	- [An archive from Byte magazine, 1982](https://archive.org/stream/byte-magazine-1982-08/1982_08_BYTE_07-08_Logo#page/n0/mode/2up) -- pages 88 to 290
	- Can you make a Logo emulator?
- [Braitenberg, Valentino. Vehicles. 1984](https://drive.google.com/file/d/1FcBQEl6E3hvNy3q-ow4HaFn2jtOPaxvA/edit)
  - Can you make a Vehicle world?
- [Craig Reynolds. Steering Behaviors For Autonomous Characters, Game Developers Conference. 1999](https://www.red3d.com/cwr/steer/gdc99/)
	- Can you make a flocking simulator?

# Steering Behaviours

https://www.youtube.com/watch?v=V4f_1_r80RY

In the late 1980s Craig Reynolds proposed a model of animal motion to model flocks, herds and schools, which he named boids. Reynolds' paper Steering Behaviors for Autonomous Characters covers boids as an aggregate of other steering behaviours. The paper has been very influential in robotics, game design, special effects and simulation, and remains well worth exploring as a collection of patterns for autonomous agent movements, so we will work through it in more detail.

### Reynold's three layers

The paper breaks agent movement in general into three layers:

- **Action Selection**: selecting actions to perform according to environmental input and goals to achieve.
- **Steering**: path determination according to the action selected. Many different behaviors can be used; the essential strategy is to compute a new force, which is often in terms of a desired velocity minus current velocity
- **Locomotion**: mechanisms of conversion of steering into actual movement.
  
His paper concentrates on several different steering algorithms. Action selection is not dealt with, as it is considered independent. Locomotion is extremely simple -- equivalent to a single force vector on a point mass -- but a more complex (and thus constrained) locomotion system could be swapped in without changing the steering model significantly. Many ideas for combining different steering force behaviours are given.

> Notice that in the "related work" section the paper refences Grey Walter's Tortoises, Rodney Brooks' robotics, and Valentino Braitenberg's Vehicles.


### Locomotion

**Position** is a vector coordinate `[x, y]` in the world's coordinate system (e.g. pixels of the canvas).  The rate of change of position is the velocity.

**Velocity** is a vector `[x, y]` that represents heading (the vector direction) and speed (the vector length).  The rate of change of velocity is acceleration.

**Acceleration** is a vector `[x, y]` that repreents how our velocity is changing, in direction and speed.  It is typically thought of as the result of forces. 

**Forces** are also vectors `[x, y]` because each force has a direction and a magnitude.  Gravity on Earth is a force whose direction is always down (the Y axis) and a constant magnitude (the gravitational constant `g`).

- Acceleration = (sum of forces) / mass (we often assume mass=1 for simplicity)
  - Limit magnitude of acceleration as pseudo-friction
  - (Or, accel = (old accel * inertia) + force)
- Velocity += acceleration
  - Limit to max speed
- Position += velocity
  - Limit or wrap in space?

In order to build a microworld like this, we'll need some re-usable math for working with vectors. 

## Vectors

The simple vehicle model, and all of the behaviours, make use of vectors -- representing positions in space, relative distances, velocities, forces and accelerations etc. We might need to add, subtract, scale, rotate, randomize etc. vectors. 

> We could make use of an existing library such as [gl-matrix](https://glmatrix.net/docs/module-vec2.html) by means of adding `<script src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/3.4.2/gl-matrix-min.js" />` to our HTML page.  If you do use a library like this, I highly recommend looking over the API keeping a personal 'cheat sheet' set of notes for the most useful functions and concepts.  [I have a set of cheat-sheets for `gl-matrix` here.](https://github.com/worldmaking/worldmaking.github.io/wiki/JS-Canvas,-Vector,-Matrix-etc.-notes)

Or, we could write a set of routines to do these things, adding functions as we need them as a way to learn and re-use code. [At the end of this page, there's a walk-through of building up such a set of routines, including how each one was written and why, solving one problem at a time.](#how-to-do-things-with-2d-vectors)

### Steering

The majority of the paper is devoted to different models of how to set up "desired velocities" that update the agent, and a common process to convert the desired veloicty into a "steering force". 

Reynolds provides a variety of different kinds of desired velocity generators including **pursuit, evasion, arrival, avoidance, wander, follow, containment, flow field, collision avoidance, separation, cohesion, and alignment**, where the last three are the basis of **flocking**. 

The central model shared by all of these is the calculation of a **steering force** that is determined by a **desired velocity** relative to the agent's **current velocity**. In the pseudo-code given, this looks like:

```
	steering_force = desired_velocity - current_velocity
```

In practice, the system tends to work better if we normalize the desired_velocity to some `max_speed` limit. This steering_force can then scaled by some kind of weighting factor (so we can make it stronger or weaker relative to other steering forces), and then capped by a reasonable `max_force` limit to prevent the system blowing up.  

```
get_steering_force(current_velocity, desired_velocity, weighting_factor) {
	// re-scale desired_velocity to the max_speed:
	desired_velocity = normalize(desired_velocity) * max_speed
	// get change required (as a "force")
	relative = desired_velocity - current_velocity
	// limit this force:
	return limit_force(relative, max_force) * weighting_factor
}
```

A system can be a combination of many different steering forces, which are all added together to get the total force acting upon an agent. This total force is then fed into the locomotion engine to update the agent's velocity and position. 

---

## Setting up a basic template

We can borrow some starter code from what we have done previously. 

```js
const canvas = document.getElementById("mycanvas");
canvas.style.cursor = 'crosshair';
const ctx = canvas.getContext("2d");

// resize canvas to fill available space:
function onResize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
onResize(); // do it now!
window.onresize = onResize; // also do it if the window changes size

// add mouse handlers:
canvas.addEventListener('pointerdown', function(e) {
	let x = e.clientX;
	let y = e.clientY;
	
})
canvas.addEventListener('pointermove', function(e) {
	let dx = e.movementX;
	let dy = e.movementY;
  
})
canvas.addEventListener('pointerup', function(e) {
  
})

// here's where we update the state of the system frame by frame
function animate() {
	// get time in seconds
	let t = performance.now() / 1000;

}

// here's where we render the system to the canvas
function draw() {

	// clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// the 'main loop'
function update() {
	animate();
	draw();
	requestAnimationFrame(update);
}

// start it up:
update();
```

### Ontology

We are certainly going to need to create a population of agents. This could be a list of objects, where each object represents an agent. 

What does each agent require? At the very least, a position vector in space, and a velocity vector, since both of these are incrementally modified frame by frame. 

Perhaps we may want a **factory function** to create an agent with these properties, appropriately randomly initialized. 

### Parameters

Any simulation is going to need a set of parameters to control it. I suggest creating an object to store these, perhaps calling it `params`.  In general, whenever we want to add some kind of numeric control to the simulation, rather than putting the number in the code, we can put the number in the `params` object and refer to it from there. 

For example, we might have a `params.population_size` to keep track of how many agents we want. 

One advantage of doing it this way is that we can then create a user interface (**UI**) for modifying these parameters, and also a way to save and load sets of parameters from data files. We'll come back to that later. 

## Rendering

On each frame, after clearing the canvas we'll have to loop over our population of agents and draw each one in turn. 

```js
for (let i = 0; i < agents.length; i++) {
	const me = agents[i];

	// render me
}
```

Our focus is on behaviour, so for now we can make our agent rendering as simple as possible. All we need is to see their position and direction.  A simple elongated triangle would suffice. 

We know we can draw a triangle using beginPath, moveTo, lineTo, and stroke or fill commands. Here's a simple triangle pointing along the positive X axis:

```js
	ctx.beginPath();
	ctx.moveTo(200, 100);
	ctx.lineTo(30,  150);
	ctx.lineTo(30,  50);
	ctx.closePath();
	ctx.fill();  // or ctx.stroke()
```

But we are going to be drawing hundreds or thousands of them, according to their position and velocity vectors. We might also want to define their size according to a paramter. 

It would be tiresome to have to compute the relative positions of each point of the path to render each one. Fortunately, there's a much easier way. 

The trick, which is used by nearly every rendering engine in software, is to **redefine the coordinate system** to match the object being drawn, rather than the canvas being drawn to.   That is, if we move the `[0, 0]` origin of our coordinate system to the centre of our object, and rotate the coordinate system to the direction our object is facing, and scale the coordinate system to the size of our object, then we can re-use the same drawing commands for every single object. 

The 2D canvas offers ways to redefine our current coordinate system using `translate(x, y)`, `rotate(radians)`, and `scale(x, y)`. 

```js
	// set up local coordinate system of the object `o`:
	ctx.translate(x, y);
	// face the direction of travel
	ctx.rotate(angle)
	ctx.scale(size, size);

	// now draw the object
	// e.g. a triangle pointing along +x
	// where 1 unit is no longer a pixel, but rather the `params.size`
	ctx.beginPath();
	ctx.moveTo(1, 0);
	ctx.lineTo(-0.7, 0.5);
	ctx.lineTo(-0.7, -0.5);
	ctx.fill();
```

For the rotation angle, I suggest deriving this from the agent's velocity direction. 

However, these transformations are cumulative: they are modifying the current coordinate system. So, after drawing our object, we need to restore our coordinate system back to the previous canvas-based pixel coordinate system before we modify it for the next object to draw. 

Fortunately there's a simple way to do this too, using `ctx.save()` to make a copy of the current coordinate system, and `ctx.restore()` to go back to the previously saved one.  So the overall process is (in pseudocode):

```
save current coordinate system for later
	translate, rotate and scale coordinate system
	draw object
restore the saved coordinate system
```

## Simulation

As with rendering, our main task is to loop over the population to update each agent in turn. 

Following Reynold's paper, this is essentially a case of computing a total force (a 2D vector) acting upon the agent, and then applying the force through locomotion. 

```js
	// our goal will be to compute the total forces acting on me
	// we will add them into this vector:
	let force_total = [0, 0]

	// ... compute whatever steering forces we are modeling and add them to force_total

	// then apply the force_total as locomotion
	// my velocity += force_total
	// limit my velocity between min & max speed constraints

	// my position += my velocity
	// limit my position in the world bounds
```

- Try first with a simple force acting in one direction.  
- Then try with a global random force (like a wind).  
- Then try with each agent having its own random direction force (a 'random walk').

### Steering forces

Perhaps we can also try something like an attraction or repulsion from the mouse location, using the **seek** or **flee** models of Reynold's paper. 

In this case, we need to get the relative vector from agent to mouse (or mouse to agent), which is vector subtraction. We might also want to ensure that the distance between them is below a certain threshold, by testing the length of the relative vector.  Here's some pseudocode:

```
mouse_rel = mouse_pos - agent_pos
mouse_distance = length(mouse_rel)
if mouse_distance < threshold_distance
	mouse_force = get_steering_force(agent_velocity, mouse_rel, strength)
	force_total += mouse_force
```

Finally we compute that steering force using the method in Reynold's paper. This part is generic -- it is used for very many different steering force behaviours, so we can wrap it up in a re-usable function. Here's pseudocode again:

```
get_steering_force(current_velocity, desired_velocity, weighting_factor) {
	// re-scale desired_velocity to the max_speed:
	desired_velocity = normalize(desired_velocity) * max_speed
	// get change required (as a "force")
	relative = desired_velocity - current_velocity
	// limit this force:
	return limit_force(relative, max_force) * weighting_factor
}
```

### Attraction to neighbors (Cohesion)

The Cohesion behaviour is defined as one boids' attraction toward the mid-point of all the nearby boids. We'll need to define what "nearby" means, e.g up to a certain distance. And then to get the mid-point, we take the average of the positions of those boids. 

To do this, we'll have to iterate over all the potential neigbours, figure out which ones are close enough to consider, and apply a  'seek' like force to their averaged position. 

To visit every potential neighbor we'll need another loop over the population, nested within our main loop over the population, being careful to use different variable names.  That's a 2D nested loop, making sure that every agent considers every other.  

> This is not the most efficient method: for N agents, we will end up doing NxN tests. In computer science terms it is called an O-squared algorithm, because as the order of the system increases, the amount of computation increases by the square of it.  For a small population of a few hundred agents this isn't a big deal so we will not worry about it now, but for bigger populations we'd want to think about more optimized methods to limit how many comparisons we need to make -- most of which revolve around partitioning the space into subregions to consider, so we never test against very distant neighbours. 

We also need to make sure we don't test against ourself!  If the current agent is `me` and the neighbor being tested is `you`, we can skip this iteration when they are equal using `continue`. The `continue` command in Javascript (and many other languages) essentially aborts the current iteration of the for loop and moves to the next one. 

```js
		if (me == you) continue;
```

We can also skip comparing neigbours if they are too far away -- our 'boids' only care about flocking with nearby agents.  We can start by getting the relative vector and the distance from that. In pseudo-code:

```
	rel = you_pos - me_pos
	distance = length(rel)

	if distance > threshold
		continue
```

Computing the average position means adding things up and dividing by the total number.  So, before we loop over neigbors, we can establish variables to hold these values:

```
count = 0
position_sum = [0, 0]
```

And for each neigbor in range, we do 

```
	count = count + 1
	position_sum = position_sum + you_pos
```

And after visiting all neigbors, we can get the average

```
if count > 0
	position_average = position_sum / count
```

To turn that into a desired velocity, we make that relative to us by subtracting our position, then pass this to the same get_steering_force:

```
	relative_position = position_average - my_pos
	cohesion_force = get_steering_force(agent_velocity, relative_position, cohesion_strength)
	force_total += cohesion_force
```

### Separation

Notice that agents can fly right through each other; this is not very realistic. We'd like the agents to avoid hitting each other! 

Here we want to use a different distance threshold, since our "personal space" is much closer to us than our visible range. 

The force applied however needs to be much stronger when very close.  A common method is to use a 1/distance or 1/(distance squared) law.

To make it a repulsion, we negate this direction

```
	if distance < personal_space
		avoidance = negate( rel / distance )
		separation_force = get_steering_force(agent_velocity, avoidance, separation_strength)
		force_total += separation_force
```

### Alignment

The third and final aspect of flocking.  Here our boid wants to point in the same direction and go at the same speed as its nearby neighbors. That is, our goal is to match the average velocity of the neigborhood.

Again, we can sum up our visible neigbor's velocities in a `velocity_sum` variable, and then after the loop get the average:

```
	alignment = velocity_sum / count
	alignment_force = get_steering_force(agent_velocity, alignment, alignment_strength)
	force_total += alignment_force
```

---

With that, we should have all of the components for a flocking simulation.  Whether or not it displays good flocking may depend on the actual parameters we are using, and a couple of other refinements we can add. 

## Refinements

### Field of view

To be even more realistic, we might also consider that our boids don't have 360 degree vision; perhaps they only see each other within a limited field of view. 

```
	rel_angle = angle_between(my_velocity, rel)
	if abs(rel_angle) > field_of_view/2
		continue
```


### A parameter modification UI

It would be nice to be able to tweak parameters to see how it changes behviours. 

For a quick solution, we can add the **dat-gui** library to our javascript, by adding this to our HTML code before our script:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.9/dat.gui.min.js"></script>
```

The **dat-gui** library adds a simple drop down system for modifying our parameters. 

[Here's the API docs](https://github.com/dataarts/dat.gui/blob/master/API.md), and my quick cheatsheet:

```js
// an container of parameters to control:
let params = {
    speed: 1
}

// create the interface:
let gui = new dat.GUI({name: 'My GUI'});
// add a slider for params.speed, in the range of 0 to 10, stepping in 1's
gui.add(params, 'speed', 0, 10, 1);
gui.close();   // start collapsed

// create a subgroup of parameters:
const see = gui.addFolder('Perception');
see.add(params, 'perception', 10, 200, 1).name('radius');
see.open(); // have this subgroup open by default:
```

> (If it doesn't show up, it might be because of the CSS setting: if you have `* { overflow: hidden; }` change it to `body { overflow: hidden; }`)

### Trails

A cheap way to render trails is that instead of erasing the canvas, we draw a not-quite-opaque white box over the entire canvas:

```js
	ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
```

# How to do things with 2D vectors

In this section I provide a walk-through of how a library of re-usable 2D vector functions can be written, solving one problem at a time. 

## How to represent a vector?  

One way is just to use two variables, `x` and `y`, every time. But maybe it is more useful to pass vectors around as singular objects.  In that case, here are the two most common formats:

```js
// as an object:
v = { x: 0, y: 0 }; 

// as an array:
v = [0, 0]; 
```

The object form is more readable, but the array form is more compact and flexible, which is why it is a more common choice. It's what I'll use here.  

```js
let v = [1, 2];
```

---

Having them as single objects makes it easier to store them inside other objects, and pass them around as arguments and return values for functions, and modify them in-place. 

## How do we get the individual x and y components of a vector?

```js
let x = v[0];
let y = v[1];
// or in one line:
let x = v[0], y = v[1];
// or using a neat "destructuring" syntax:
let [x, y] = v; 

function create(x, y) { return [x, y]; }

let v = create(3, 4);
```

## How do we set the x and y components of a vector?

```js
v[0] = 3;
v[1] = 4;

// or:
// set the components of vector `v` to the number values `x` anx `y`
function set(v, x, y) {
	v[0] = x;
	v[1] = y;
	return v;
}
```

## A re-usable library

We've already seen a couple of functions that we could use in a 2D vector library -- and we will see many more. To keep all of the functions together in a tidy way, we can define an object `vec2` to hold them. 

```js
const vec2 = {
	// create a vector from two values:
    create(x, y) { return [x, y]; },
	// set values of a vector:
    set(v, x, y) {
        v[0] = x;
        v[1] = y;
        return v;
    },

	// add more functions here... 
}

// using it:
let v = vec2.create(3, 4);
vec2.set(v, 1, 1)
```

## How do we make a copy of a vector?

Remember, it is very important to know that passing an object around between variables does not make a copy. 

```js
let a = [1, 2];
let b = a; 
```

Both `b` and `a` now refer to the same object in memory! If I modify `b`, it will also modify `a`. They are both **references** to the same memory. That might be want you want, or you might actually want ot make an independent **copy**. 

```js
// one way is to unpack the vector then pack it into a new vector:
let [x, y] = v;
let copy = [x, y];
// or in one line:
let copy = [...v];  // this creates a new array using the elements of v

// or wrap this into a reusable function so you don't have to remember it:
const vec2 = {
	// create(), set(), etc. 
	// ...
	copy(v) { return [...v]; },
	// ...
}
```

## How do you get the length of a vector?

By the Pythagorean formula, the length of the hypoteneuse is the square root of the sum of the squares of the two sides.  That is, `len = Math.sqrt(x*x + y*y)`.  Or more simply, `Math.hypot(x, y)`. 

```js
  len(v) {
  	let [x, y] = v;
      return Math.hypot(x, y);
  }
```

## How do you scale a vector's length (multiply, negate, and divide)?

Let's say the vector represents a velocity, and we want to slow it down to a half of its original speed.  Then we want the length of the vector (the speed) to be multiplied by 0.5, which we can simply do by multiplying the `x` and `y` parts by 0.5. 

```js
	// scale vector `v` by number `s`
    scale(v, s) {
        let [x, y] = v;
        return [x * s, y * s];
    }
```

```js
	// negating a vector's components will reverse its direction:
    negate(v) {
        return [-x, -y];
    }
```

What about division?  To divide by `d`, we can simply multiply (`scale`) by `1/d`. But there's a gotcha here: what if d=0?  Division by zero is mathematically undefined, and would cause problems in our simulations. What should we do in this case? One option is to simply ignore the operation.  Since `scale` makes a new vector, we can simply create an unchanged copy of the vector when d==0.

```js
	// scaling by division needs to handle the undefined case of division by zero
    // here we simply create an unchanged duplicate
    divide(v, d) {
        let [x, y] = v;
        if (d) {
            return [x / d, y / d];
        } else {
            return [x, y];
        }
    }
```

## How to add or subtract vectors? How to get the distance between two positions (two coordinate vectors)?

Simply subtract one vector from the other, then get the length of the result.  You add and subtract vectors just by adding or subtracting their `x` and `y` parts.  

Given two points A and B, then the vector `A-B` tells you how to get to A from B.  This is a **relative vector**, which is a very useful concept.  

```js
	// add vectors `a` and `b`
    add(a, b) {
        let [x1, y1] = a
        let [x2, y2] = b
        return [x1 + x2, y1 + y2];
    },
    // subtract vectors `a` and `b`
    sub(a, b) {
        let [x1, y1] = a
        let [x2, y2] = b
        return [x1 - x2, y1 - y2];
    },
	// get the distnace between coordinate vectors `a` and `b`
	distance(a, b) {
		let [x1, y1] = a
		let [x2, y2] = b
		return Math.hypot(x1-x2, y1-y2);
	},
```

## How do you get the angle of a vector? (Working with Radians)

We'll need this to figure out what direction it is facing.  The most typical method is to use the arctangent, (the angle of a right triangle is the opposite length divided by the adjacent length). In code, `angle = Math.atan2(y, x)`.  *Notice that the argument order is y, x!*

```js
	// get angle of vector `v` in radians
    angle(v) {
        let [x, y] = v;
        return Math.atan2(y, x);
    },
```

Note that this angle is given in **radians**, not degrees.  There are 2 x pi radians in one circle, i.e. 2 x pi radians = 360 degrees, or pi radians = 180 degrees. (Why use radians and not degrees? Because it is a mathematically more meaningful value, relating radius, circumference and area of a circle, for example.) If we need to convert between them we can use conversion factors like this:

```js
	// convert angles between degrees and radians representations:
    degrees(radians) { return radians * Math.PI / 180; },
    radians(degrees) { return degrees * Math.PI / 180; },
```

OK now we know how to convert an `[x, y]` vector into a direction angle and length (which is converting from **Cartesian to polar** representation), but what if we want to go the other way, to go from polar angle & length back to a Cartesian `[x, y]` representation?  First, we use the trigonometric rules of sine & cosine of the angle to get our unit right triangle components, then we scale that by the desired length:

```js
	// create a vector from an angle (in radians) and length
    from_polar(angle, length = 1) {
        let x = length * Math.cos(angle)
        let y = length * Math.sin(angle)
        return [x, y]
    },
```

## How do you rotate an vector by a given angle?

We can use the cosine & sine components of an angle to rotate a vector. 

```js
	// rotate vector `v` by an `angle` in radians
    rotate(v, angle) {
        let [x, y] = v;
        let c = Math.cos(angle)
        let s = Math.sin(angle)
        return [ x*c - y*s, x*s + y*c ]
    },
```

This is actually a 2D matrix transformation.  The matrix form of this looks as follows: 

```
[ c, s 
 -s, c ]
```

Note that this is rotating the vector around the origin [0, 0]. To rotate around a different pivot point, first translate that point so that the pivot point becomes the origin (i.e. subtract the pivot), rotate, then translate back by adding the pivot again. 

```js
	// rotate vector `v` by `angle` in radians around a `pivot` coordinate
    rotate_around(v, pivot, angle) {
        let [x1, y1] = v
        let [x2, y2] = pivot
        // subtract pivot:
        let x = x1 - x2;
        let y = y1 - y2;
        let c = Math.cos(angle)
        let s = Math.sin(angle)
        // rotate and add pivot
        return [x2 + (x*c - y*s), y2 + (x*s + y*c)]
    }
```

## How do you create a random vector? 

Let's say we are creating agents and we want to place them randomly in a coordinate space. In that case, we may want a random `x` between 0 and `canvas.width`, and `y` between 0 and `canvas.height`.  Then we could use something like `[ Math.random()*width, Math.random()*height ]`. 

```js
	// get a random vector in the box between [0, 0] and [width, height]
    // here I set the default width to be 1, and the default height to match
	// so calling `random()` with no arguments returns a random coordinate with values between 0 and 1 on each axis
	random(width = 1, height = width) {
        let x = Math.random() * width
        let y = Math.random() * height
        return [x, y];
    }
```

But what if we want to have a vector that has a random direction? For example, if we wanted to set an agent's initial velocity. That would have to be equally balanced in terms of angle, and that would include negative as well as positive values.  And maybe we also want to define what the initial speed is.  

In that case, we need a function that takes a magnitude, and creates a vector that has that magnitude and a random angle. 

```js
	// get a vector of specified length in a random direction
	// again the default argument means `random_direction()` 
	// with no arguments gives a random direction vector of length 1
    random_direction(length = 1) {
        let angle = Math.random() * Math.PI * 2
		let x = length * Math.cos(angle)
        let y = length * Math.sin(angle)
        return [x, y]
    },
	// get a vector of a random length (from 0 to `max`) in a random direction
    random_disc(max = 1) {
        let angle = Math.random() * Math.PI * 2
		let length = ath.random() * max
		let x = length * Math.cos(angle)
        let y = length * Math.sin(angle)
        return [x, y]
    },
```

## How do you force a vector's length to be one? (Normalization)

This is called **normalizing** a vector. It throws away the length and keeps only the direction, which is a very useful thing to be able to do.  And its simple: get the length, then rescale the vector by dividing by the length (or equivalently, multiplying by `1/length`). 

However there's a gotcha here: what if the vector is [0, 0]? In that case, the length is zero. But dividing by zero will lead to an undefined infinite value, which the computation can't process. We need to guard against this case. 

> Intuitively it makes sense.  If your velocity is [0, 0], then you have a speed of 0, and there is no defined direction at all -- you could be pointing in any direction, it doesn't matter!

Here we have a few options. We could ignore the call to normalize the vector, or we could ask it to create a random vector of length 1. I chose the latter as the more interesting option! 

```js
	// force the vector length = 1
    // if the vector was [0, 0] it will produce a random direction vector
    normalize(v) {
		const [x, y] = v;
		const len = Math.hypot(x, y);
        if (len > 0) {
			const s = 1/len
            return [x * s, y * s];
        } else {
			// vector of length 1 with random angular direction:
			let angle = Math.random() * Math.PI * 2
            return [Math.cos(angle), Math.sin(angle)];
        }
    },
```

## How to limit the length of a vector? 

Sometimes we don't want a vector's length to get too big. Maybe we want a maximum speed limit on their movement, for example, without changing the direction.  Then we need a scaling factor that is the ratio between our limit and our 

```js
	// limit vector 'v' to maximum length `max` 
    // `max` must be >= 0
    limit(v, max) {
		const [x, y] = v;
		const len = Math.hypot(x, y);
		if (len > max) {
			const d = max/len;
			return [x * d, y * d];
		} else {
			return [x, y]
		}
    },

	// limit vector 'v' length between `min` and `max` 
    // `min` and `max` must be >= 0
    limit2(v, min, max = 1) {
		const len = Math.hypot(x, y);
        const d = len || 1; // to avoid divide by zero
        const clamped = Math.min(Math.max(d, min), max);
		const d = clamped / d;
        return [x * d, y * d];
    },
```

## How to limit a vector within a bounded range of values?

Let's say the vector represents a coordinate position on a canvas of `width` and `height`, and we want to prevent the position from going outside those bounds. 

We could clamp, it in the bounds, or we could wrap it around the edges like a toroidal (pac man) space. 

```js
	// clamp vector `v` in the bounds of `width` and `height`
	clamp(v, width, height) {
		let [x, y] = v;
		x = Math.min(Math.max(x, 0), width);
		y = Math.min(Math.max(y, 0), height);
		return [x, y]
	},
	// wrap vector `v` in the bounds of `width` and `height`
	wrap(v, width, height) {
		let [x, y] = v;
		if (x < 0) x += width; else if (x > width) x -= width;
		if (y < 0) y += height; else if (y > height) y -= height;
		return [x, y]
	},

```

## How to get the angle between two vectors?

This is an extremely useful thing to do -- for example, to know if we are traveling in the same direction as someone else, or to know how much to turn to point somewhere.  The math of this is a little trickier.  It involves two 2D vector calculations, one called the determinant (sometimes called the 2D cross product), the other called the dot product. 

> An interesting property of the determinant: if the value is zero, the two vectors are on the same line (either same direction or opposite direction).  It is the signed area of the parallelogram formed by the two vectors. 

> An interesting property of the dot product: if the two vectors are orthogonal to each other (90 degrees apart), the dot product is zero.  The dot product of two **normalized** vectors is 1 if they are the same direction, -1 if they are opposite. 

```js
	// dot product of two vectors `a` and `b`
	// returns 0 if the vectors are orthogonal
	// if `a` and `b` are unit vectors (normalized vectors), 
	//   returns 1 if the directions are equal, and -1 if the directions are opposite
	dot(a, b) {
		let [x1, y1] = a
		let [x2, y2] = b
		return x1 * x2 + y1 * y2;
	},
	// determinant (2D cross product) of two vectors `a` and `b`
	// it is the (signed) area of the parallelogram formed by a and b
	// returns 0 if the two vectors have equal or opposite directions
	det(a, b) {
		let [x1, y1] = a
		let [x2, y2] = b
		return x1 * y2 - y1 * x2;
	},
	// return the angle (in radians) between vectors A and B:
	angle_between(a, b) {
		let [x1, y1] = a
		let [x2, y2] = b
		let det = x1 * y2 - y1 * x2; // determinant ("2D cross product") of a and b
		let dot = x1 * x2 + y1 * y2; // dot product
		return Math.atan2(det, dot);
	},
```

## How to make one vector interpolate toward another?

Let's say I have a vector coordinate A, and I want it to move 25% of the way toward vector coordinate B.  A simple **linear interpolation** (also known as "lerp") here is to take the weighted average, that is, 75% of A plus 25% of B. 

```js
	// linear interpolation between point `a` and point `b` with weight `t` 
	// when t=0, returns `a`; when t=1, returns `b`; 
	// when t=0.5, returns mid-point between `a` and `b`, etc.
	lerp(a, b, t) {
		let [x1, y1] = a
		let [x2, y2] = b
		return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
	}
``` 

## Everything together in one `vec2` collection


```js
const vec2 = {
	// convert angles between degrees and radians representations:
	degrees(radians) { return radians * Math.PI / 180; },
	radians(degrees) { return degrees * Math.PI / 180; },
	// create a vector from two values:
	create(x, y) { return [x, y]; },
	// create a duplicate of a vector `v`
	copy(v) { return [...v]; },
	// set values of a vector:
	set(v, x, y) {
		v[0] = x;
		v[1] = y;
		return v;
	},
	// create a vector from an angle (in radians) and length
	from_polar(angle, length = 1) {
		let x = length * Math.cos(angle)
		let y = length * Math.sin(angle)
		return [x, y]
	},
	// get length of vector `v`
	len(v) {
		let [x, y] = v;
		return Math.hypot(x, y);
	},
	// add vectors `a` and `b`
	add(a, b) {
		let [x1, y1] = a
		let [x2, y2] = b
		return [x1 + x2, y1 + y2];
	},
	// subtract vectors `a` and `b`
	sub(a, b) {
		let [x1, y1] = a
		let [x2, y2] = b
		return [x1 - x2, y1 - y2];
	},
	// get the distnace between coordinate vectors `a` and `b`
	distance(a, b) {
		let [x1, y1] = a
		let [x2, y2] = b
		return Math.hypot(x1-x2, y1-y2);
	},
	// scale vector `v` by number `s`
	scale(v, s) {
		let [x, y] = v;
		return [x * s, y * s];
	},
	// negating a vector's components will reverse its direction:
	negate(v) {
		return [-x, -y];
	},
	// scaling by division needs to handle the undefined case of division by zero
	// here we simply create an unchanged duplicate
	divide(v, d) {
		let [x, y] = v;
		if (d) {
			return [x / d, y / d];
		} else {
			return [x, y];
		}
	},
	// get angle of vector `v` in radians
	angle(v) {
		let [x, y] = v;
		return Math.atan2(y, x);
	},
	// rotate vector `v` by an `angle` in radians
	rotate(v, angle) {
		let [x, y] = v;
		let c = Math.cos(angle)
		let s = Math.sin(angle)
		return [x * c - y * s, x * s + y * c]
	},
	// rotate vector `v` by `angle` in radians around a `pivot` coordinate
	rotate_around(v, pivot, angle) {
		let [x1, y1] = v
		let [x2, y2] = pivot
		// subtract pivot:
		let x = x1 - x2;
		let y = y1 - y2;
		let c = Math.cos(angle)
		let s = Math.sin(angle)
		// rotate and add pivot
		return [x2 + (x * c - y * s), y2 + (x * s + y * c)]
	},
	// get a random vector in the box between [0, 0] and [width, height]
	random(width = 1, height = width) {
		let x = Math.random() * width
		let y = Math.random() * height
		return [x, y];
	},
	// get a vector of specified length in a random direction
	// again the default argument means `random_direction()` 
	// with no arguments gives a random direction vector of length 1
    random_direction(length = 1) {
        let angle = Math.random() * Math.PI * 2
		let x = length * Math.cos(angle)
        let y = length * Math.sin(angle)
        return [x, y]
    },
	// get a vector of a random length (from 0 to `max`) in a random direction
    random_disc(max = 1) {
        let angle = Math.random() * Math.PI * 2
		let length = ath.random() * max
		let x = length * Math.cos(angle)
        let y = length * Math.sin(angle)
        return [x, y]
    },
	// force the vector length = 1
    // if the vector was [0, 0] it will produce a random direction vector
    normalize(v) {
		const [x, y] = v;
		const len = Math.hypot(x, y);
        if (len > 0) {
			const s = 1/len
            return [x * s, y * s];
        } else {
			// vector of length 1 with random angular direction:
			let angle = Math.random() * Math.PI * 2
            return [Math.cos(angle), Math.sin(angle)];
        }
    },
	// limit vector 'v' to maximum length `max` 
    // `max` must be >= 0
    limit(v, max) {
		const [x, y] = v;
		const len = Math.hypot(x, y);
		if (len > max) {
			const d = max/len;
			return [x * d, y * d];
		} else {
			return [x, y]
		}
    },
	// limit vector 'v' length between `min` and `max` 
    // `min` and `max` must be >= 0
    limit2(v, min, max = 1) {
		const len = Math.hypot(x, y);
        const d = len || 1; // to avoid divide by zero
        const clamped = Math.min(Math.max(d, min), max);
		const d = clamped / d;
        return [x * d, y * d];
    },
	// dot product of two vectors `a` and `b`
	// returns 0 if the vectors are orthogonal
	// if `a` and `b` are unit vectors (normalized vectors), 
	//   returns 1 if the directions are equal, and -1 if the directions are opposite
	dot(a, b) {
		let [x1, y1] = a
		let [x2, y2] = b
		return x1 * x2 + y1 * y2;
	},
	// determinant (2D cross product) of two vectors `a` and `b`
	// it is the (signed) area of the parallelogram formed by a and b
	// returns 0 if the two vectors have equal or opposite directions
	det(a, b) {
		let [x1, y1] = a
		let [x2, y2] = b
		return x1 * y2 - y1 * x2;
	},
	// return the angle (in radians) between vectors A and B:
	angle_between(a, b) {
		let [x1, y1] = a
		let [x2, y2] = b
		let det = x1 * y2 - y1 * x2; // determinant ("2D cross product") of a and b
		let dot = x1 * x2 + y1 * y2; // dot product
		return Math.atan2(det, dot);
	},
	// clamp vector `v` in the bounds of `width` and `height`
	clamp(v, width, height) {
		let [x, y] = v;
		x = Math.min(Math.max(x, 0), width);
		y = Math.min(Math.max(y, 0), height);
		return [x, y]
	},
	// wrap vector `v` in the bounds of `width` and `height`
	wrap(v, width, height) {
		let [x, y] = v;
		if (x < 0) x += width; else if (x > width) x -= width;
		if (y < 0) y += height; else if (y > height) y -= height;
		return [x, y]
	},
	// linear interpolation between point `a` and point `b` with weight `t` 
	// when t=0, returns `a`; when t=1, returns `b`; 
	// when t=0.5, returns mid-point between `a` and `b`, etc.
	lerp(a, b, t) {
		let [x1, y1] = a
		let [x2, y2] = b
		return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
	}
};
```

---

More examples

https://codepen.io/editor/grrrwaaa/pen/01a1a2b2-8d06-727e-8b8a-f9773163f90e

https://codepen.io/grrrwaaa/full/XXevBb

https://codepen.io/grrrwaaa/full/GRqWxMx