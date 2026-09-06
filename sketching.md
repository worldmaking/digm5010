
# Computational sketching

It can be helful sometimes to step into the shoes of those that have gone before, to see how we ended up here, and **what we may have lost or missed along the way**. 

Take [John Maeda](https://en.wikipedia.org/wiki/John_Maeda), the designer & MIT Media Lab professor, who pioneered reactive graphics in the era of the Macintosh and CD-ROM. 

> **Design By Numbers (John Maeda, 1999)**   
> "Drawing by hand, using pencil on paper, is undisputedly the most natural means for visual expression. When moving on to the world of digital expression, however, the most natural means is not pencil and paper, but rather, computation. Today, many people strive to combine the traditional arts with the computer, and while they may succeed at producing a digitally empowered version of their art, they are not producing true digital art. True digital art embodies the core characteristics of the digital medium, which cannot be replicated in any other.
> 
> "Computation is intrinsically different from existing media because it is the only medium where the material and the process for shaping the material coexiist in the same entity: numbers. The only other medium where a similar phenomenon occurs is pure thought. It naturally follows that computational media could eventually present the rare opportunity to express a conceptual art that is not polluted by textual or other visual representation. This exciting future is still at least a decade or two away. For the moment, we are forced to settle with society's current search for true meaning in an enhanced, interactive version of the art that we have always known."

Maeda studied with Muriel Cooper and Paul Rand, and redefined the use of electronic media as a tool for expression by combining computer programming with traditional artistic technique, which helped lay the groundwork for interactive motion graphics as seen on the web today. ([This itself is part of a longer genealogical history that traces back to a movement of thought in the 1960's regarding how computers can augment intelligence, the nature of creativity -- with implications for AI development today](https://www.bostonreview.net/forum/the-ai-we-deserve/]))

Other key insights from Maeda's interactive graphics explorations:

  - the most **interesting** pixels on the screen are the mouse
  - the mouse represents not just **space** but also **time** -- use it

Maeda's courses and research in the Aesthetics & Computation group at MIT inspired a whole generation of creative coders. He taught Casey Reas and Ben Fry, and his [Design By Numbers](https://en.wikipedia.org/wiki/Design_By_Numbers) software was the precursor of their Processing (which led to [P5.js](https://p5js.org/)). 

Maeda's courses challenged students to rethink the medium from its most basic elements. A typical assignment:

> Given a mobile point in space over a finite rectangular area, create a parametric drawing that illustrates repetition, variety, or rhythm. [MAS 964 P](https://acg.media.mit.edu/courses/mas964/presentation/panels.html)

## A reading

Golan Levin was one of Maeda's students, and went on to focus specifically on the creation of audiovisual instruments, responding directly to Maeda's project. He is now a professor at Carnegie Mellon University, and a key figure in the Art & Code community. There’s a lot to draw from [his Master's thesis](http://www.flong.com/archive/texts/publications/thesis/index.html), both theoretically and practically. 

(Also note the document structure, as an example of a thesis in our field.)

For example, look at Curly and [Yellowtail](http://www.flong.com/archive/projects/yellowtail/index.html) -- perhaps we can try to recreate this as our first example of "reproducing research". 

-----

## Let's get making

- A shareable workspace: [codepen](https://codepen.io)
  - The HTML5 trio: the HTML (DOM), CSS, and JavaScript
    - HMTL: the page container and structure. The language forms a **declarative** data structure, roughly in a tree structure. 
    - CSS: the rules of layout, rendering and style. The language forms a set of **declarative** definitions. 
    - JS: dynamic generation and behaviour. The language forms **procedural** steps of action, invoked in response to events. 
- Notes on [Javascript](https://github.com/worldmaking/worldmaking.github.io/wiki/JS-notes)
- What is an API? 
  - E.g. the MDN [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial).  Canvas is a rectangular object in an HTML page, suitable for static and dynamic 2D or 3D graphics rendering.
- Notes on 2D drawing in the web using [Canvas, vectors, matrices](https://github.com/worldmaking/worldmaking.github.io/wiki/JS-Canvas,-Vector,-Matrix-etc.-notes) 

Let's start with a sketching application -- but let's think about how we can use computation to augment or transform our gestures in some way.
- First, what elements do we need? 
- Starting from Maeda's observations, what concepts need to be mechanized?
- How do we look into API documentation to find the methods we need?
- How do we start? 
- What are the events?
- Begin with pseudo-code, then transform to working code?
  
---

Examples from course in 2024-25

https://codepen.io/grrrwaaa/pen/gbaJjgv

https://codepen.io/grrrwaaa/pen/yLdrXNQ

https://codepen.io/grrrwaaa/pen/Yzdxwgj

**Homework**

Have a good read of [Golan Levin's Master thesis](http://www.flong.com/archive/texts/publications/thesis/index.html), and note down your thoughts and questions about it for our next coding session! 

How would you respond to the example challenge, *"Given a mobile point in space over a finite rectangular area, create a parametric drawing that illustrates repetition, variety, or rhythm."*?  


## Animate drawing

Let's continue with the sketching. 

<!--

> First a quick note -- what we are doing looks a bit like p5.js. In fact, if we remember to refactor code that we will re-use into re-usable functions, then it might start to look even more like p5.js -- maybe we will have `line()` and `background()` etc.  That's good: we are in the stage of *reproducing research*. And if we find there are moments where we want to do things a little differently, because of the needs of our project, that's good too -- we aren't limited to what's already given because we know how to remake it, and maybe we'll have a discovery that can advance research! 

- We saw how we can draw in response to mouse/touch movements, and add generative variation to them. 
- We talked about Maeda's comment "the most interesting pixels are the mouse" and this represents not just space but also **time**. How can we use the timing of a drawing gesture to modify the result? Can you think of ways to use speeds, rhythms, echoes, ?

  - Can we *reify* the time of the gesture?

A more complex example, inspired by Paul Haberli's *Dynadraw*: 

https://codepen.io/grrrwaaa/pen/gOYQyrd?editors=0010

[Example script from a previous class](https://codepen.io/grrrwaaa/pen/GRbVYrw?editors=0011)

### Reproducing Curly/Yellowtail

  - We can make animations through an erase/draw loop, demonstrated by drawing random lines on each frame. But these have no consistency from one frame to the next. How can we add consistency?
  - Or: how can we combine both sketching and animating? How can we draw a line that then animates?
    - Can we *reify* the drawing?

With these steps, we should be in a position to attempt to reconstruct Golan Levin's Curly/[Yellowtail](http://www.flong.com/archive/projects/yellowtail/index.html), for example. 

**This is an example of reproducing research.**  First we should sketch out what is required based on the source material, and work from there to refine from a sketch through pseudo-code and implementation of components until we have the final result. 

> "Yellowtail repeats a user's strokes end-over-end, enabling simultaneous specification of a line's shape and quality of movement. Each line repeats according to its own period, producing an ever-changing and responsive display of lively, worm-like textures."

Detailed description from page 73 of the [thesis](http://www.flong.com/archive/storage/pdf/articles/thesis300.pdf):

> "a user’s linear marks transform into an animated display of lively,
worm-like lines. After the user deposited a mark, the system
would then procedurally displace that mark end-over-end, making
possible the simultaneous specification of both a line’s shape as
well as its quality of movement. Straight marks would move along
the direction of their own principal axes, while circular marks
would chase their own tails. Marks with more irregular shapes
would move in similarly irregular, but nonetheless rhythmic
patterns."

> The " screen space obeyed periodic (toroidal-topology)
boundary conditions, such that marks which crossed the edge of
the screen would reëmerge on the screen’s opposite side, rather
than disappearing altogether."

Notice also the self-observation and critique, see p79. Although this project does not achieve the goal of the thesis, these observations inform the progress that follows. This is a positive research path. 

---

OK so let's start by pseudo-coding Yellowtail!

Here's what we ended up with as pseudo-code in class, before we started coding:

```
there is a canvas

state:
	mouse: x, y, buttonstate
	time
	currentpath = null
	list of finished paths
		start position
		list of segments (dx, dy change vectors)

pointerdown:
	create a new currentpath object, with start position at mouse x,y & t

pointerup:
	if currentpath
		add my currentpath to the list of finished paths
		currentpath = null again

pointermove:
	if currentpath exists
		add mouse dx,dy & t to currentpath's list of segments

animate:
	for each path of finished paths
		remove 1st segment (shift)
		(something about coordinates)
		stick it onto the end (push)
		wrap around canvas width/height 
			e.g. if x > width; x -= width, etc. for 4 boundaries

drawpath:
	begin position at path's start position
	for each segment of the path
		line from last position to new position by adding segment change
		(path, moveto, lineto, stroke)

draw:
	clear screen
	for each path of finished paths
		drawpath(line)
	if currentpath exists
		drawpath(currentpath)
```

And here's the final code we ended up with:

https://codepen.io/grrrwaaa/pen/myVdEZR?editors=0010

Here's a more refined version from last year's class:

https://codepen.io/grrrwaaa/pen/vYoOLqL?editors=0010

Please continue working on extending and mutating this into a new direction! We will share each other's codepens in the next class. 
- We talked about how these lines are still fairly passive, as they just follow the series of instructions given to them by the initial gesture. How could they become a bit more autonomous?
- Each segment holds a relative change. Can we do something interesting with that?
- Are there more interesting things we could do with the boundaries?
- Should segments continue forever? 
- Each segment holds a relative time, but we aren't really using that in the animation yet. E.g. if you pause mid-gesture, then continue, the animated line moves but it does not have a pause. Can you figure out how to fix that?
- With multiple lines, they are not aware of each other. Is there a way that they could be?
- How about rhythm -- is there a way to synchronize them to an underlying meter, for example?
- Can line mutate? Getting noisier, or more angular, or more smooth, etc. over time?
- Can lines decay? Or grow?
- Can lines split into two?

---

[past version 1](https://codepen.io/grrrwaaa/pen/jOXYdMd?editors=0010)

[past version 2](https://codepen.io/grrrwaaa/pen/aagQzY?editors=0010)

---

Some rules of thumb while coding:

- Use the simplest limits you can -- e.g. limiting yourself to drawing only black lines. More colour, shape and style variations can always be added later. Let's focus on behaviour first.

- Break a problem down into sub-problems. Approach the problem from a simpler approximation first -- the simplest version. E.g. make it work in a static way before a dynamic way, or make it work for one, before making it work for many, etc.

- Try to work out a problem in pseudocode first -- just write it in commments, draw it on paper, etc, any form that is concrete will help to see the problem more clearly, and diving head first into code isn't often the right thing to do. Once the method becomes clearer, start converting pseudocode into "minimum viable" code.

- Use event handlers (draw-frame, mouse, keyboard, timers, ...) to animate and interact with things. 

- Figure out working conditions logically from basic requirements. E.g. for anything to animate we're going to need to clear the screen on each frame, which means we're going to have to redraw everything every time, which means...

- Use state (variables for numbers, strings, objects, arrays) to make things exist over time. Once captured, data can be replayed, modified, etc. Often you can represent state in a few different ways, and the choice will make some processes easier than others.

- Test often. Each time you add one minor element, make sure it works for all likely input. 

- Handle special cases: starting values, boundary cases, error handling... 

- Don't worry about trying to make anything optimal -- make the most naive way that works, then refine from there. 

- Use abstractions (functions, objects) to encapsulate and structure ideas more easily & clearly. Any time you feel like you are writing the same code several times, replace it with a function or loop. Separate out reusable "support routines" from the code that represents the main ideas. 

- Comment the code and use good variable names -- you'll thank yourself in the future when you come back to it! (And anyone else looking at the code will thank you more -- remember research is about sharing!)

- Take notes as you go. At any time you might have an idea of a different direction to explore -- you can only do one at once, so write them down! Even if they are just comments in the code.

- Make many copies, saving a version (in Codepen you can do this via a Fork) for each minor milestone. If it goes wrong but in an interesting way (a happy accident), save a version of that too.

-->