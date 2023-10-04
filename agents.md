<!--
{
	template: "slides.html"
}
-->

# Grey Walter's Tortoises

One of earliest example of cohabiting human and machine intelligent agents are Grey Walter's Tortoises. 

In the late 1940's and early 1950's, Grey Walter pioneered the engineering of autonomous agents, as early examples of self-directed robots. 

He and his family also lived with them.

---youtube:lLULRlmXkKo

---youtube:wQE82derooc 

One light sensor scans the whole space by spinning -- just the same as LiDAR sensors today

Self-recharging!

Apparent complexity despite no "programming" as such, no abstract world model, etc.

Social behaviours between robots, and with humans

---

This wasn't just tinkering at home however, there was an explicit agenda of understanding human and machine together, as part of a wider field of **Cybernetics** -- a science of behaviour general to living and machine systems, centred on an exploration of **feedback systems** and later emphasizing **observing systems**. Grey Walter was particularly interested in understanding how the neural mind works in systems terms. 

A brief history of Grey Walter's work [can be read here](http://www.rutherfordjournal.org/article020101.html) -- or for a deeper reading of Walter and other British Cyberneticians (Ross Ashby, Gordon Pask, Stafford Beer) I highly recommend Andrew Pickering's account in [The Cybernetic Brain](http://press.uchicago.edu/ucp/books/book/chicago/C/bo8169881.html). It is a fascinating history!

Remarkably, this direction of more biologically-inspired and practically-integrated research was forgotten by mainstream research as academic efforts for artificial intelligence shifted sharply toward symbolic thinking and abstract simulation, until the "rediscovery" of neural networks with deep learning in the last decades. 

---

Nevertheless, Walter's tortoises have inspired many great research projects and products of the last century. Let's see a few examples.

---image:https://upload.wikimedia.org/wikipedia/commons/2/2c/Remi_turtlegrafik.png

The **turtle graphics** of Seymour Papert's Mindstorms project

Papert used a concept of a mobile "turtle" carrying a pen in space to teach computational thinking in the Logo language.

This initiated a whole generation of children into computer programming decades ago.

More recently the educational program inspired LEGO Mindstorms robotics. among other things.


---image:img/BVinh.jpg

In a short philosophical book, cyberneticist Valentino Braitenberg started from a simple abstract model of [Vehicles](https://en.wikipedia.org/wiki/Braitenberg_vehicle) with sensors and motors and a few other component can manifest behaviors that appear identifiable as fear, aggression, love, foresight, and optimism. 

The vehicle idea was a thought experiment conceived to show that complex, apparently purposive behaviour did not need to depend on complex representations of the environment inside a creature or agents' brain. In fact simply reacting to the environment in a consistent manner was more than enough to explain the low level reactive behaviours exhibited by many animals.

[Braitenberg, V. (1984). Vehicles: Experiments in synthetic psychology. Cambridge, MA: MIT Press.](https://mitpress.mit.edu/books/vehicles)

---image:https://i.pinimg.com/originals/d8/e8/80/d8e8809350e130aa4863b8c6daa191c5.gif

The **flocking model** of Craig Reynolds was a groundbreaking simulation of moving agent populations, based on a simple concept of "steering behaviours" 

Using just **three very simple local rules** it resulted in highly complex and surprisingly organic behaviour, like flocks, swarms and fish schools, despite (or perhaps because of) having no central program, **no central controller**

You have certainly seen this implemented in hundreds of films, games, drone displays, etc. It has also inspired research in crowd simulation, traffic control, ans so on.



---image:https://twistedsifter.com/wp-content/uploads/2013/04/roomba-floor-path-long-exposure-light-painting-10.jpg

The **situated robotics** of Rodney Brooks. Brooks decried the abstract, logical nature of symbolic AI of the day. In contrast, living systems can process a complex noisy world much faster and more robustly than logical analyses or abstract simulations.

So he called for all AI research to always work with physical computing in messy real-world enviornments. This also helped a resurgent interest in robot design and hardware hacking/making.

Brooks also proposed a "subsumption architecture" model of parallel processes in which lower systems work more or less by themselves, while higher processes can suppress them. 

You may have experienced this via the [iRobot Roomba](https://www.irobot.ca/) vaccuum cleaner (or the iRobot educational robotics kits). 

(see also self-driving cars)

---image:img/reas_tissue_p_13.jpg

All of these have inspired decades of computational and digital media artists (an oft-cited example is [Casey Reas' Tissue series](https://reas.com/tissue_p/)). 

---

Let's take a closer look at **Mindstorms**, the book that started the computer revolution in schools. 

notes: 

Papert, Seymour A. Mindstorms: Children, Computers, and Powerful Ideas (2nd Edition). Basic books, 1993.

---

Seymour Papert was a psychologist and mathematician, and education theorist, deeply inspired by Jean Piaget's influential research into how children learn -- which means, how children build their own intellectual structures. 

He remembered being inspired as a child by **gears**, as **"object-to-think-with"**, which he used practically as a model to understand mathematics & physics (and more).

> "My thesis could be summarized as: What the gears cannot do the computer might. The computer's essence is its universality, its power to simulate. Because it can take on a thousand forms and can serve a thousand functions, it can appeal to a thousand tastes. [Mindstorms] is a result of my own attempts... to turn computers into flexible enough instruments that many children can each create for themselves something like what the gears were for me."

notes:

A relevant aside: Papert was also firmly against the "schizophrenic" separation of humanists-artists and scientists-engineers (because in practice, **knowing-that** (propositional knowledge) and **knowing-how** (procedural knowledge) are very rarely separated.) He believed that computers may be a tool to break this division. 

---

This shouldn't mean making the computer teach--"the computer programming the child"--instead the child must program the computer, through having a conversation with it.

- Not instructing mathematics, but exploring in "mathland" (not teaching French, but living in France)
- That means designing an environment in which a conversational approach becomes natural, informal, interesting 

---image:img/8-logoturtle.png

The first idea, "Inspired by the robot tortoises of Grey Walter, a brilliant idea for Logo by Seymour [Papert] and Marvin [Minsky] was to make a physical turtle for the children to program. Its 'mind' would be supplied by programs they would write! This brings what Grey Walter did so cleverly with a few wires and vacuum tubes into their world in a real and deep way"

---

This was translated to the screen: The **Turtle** as the object-to-think-with became a character on-screen, drawing lines as it goes around. The child "talks" to the turtle by giving instructions, which the turtle then interprets **from its own perspective**, to move around, sometimes drawing lines, etc.

For example, to understand how to draw a square, you walk the square yourself, talking "TURTLE TALK" to figure out what to do. 

```
to square
	repeat 4 [ fwd 10 right 90 ]
```

He called this **sympathetic reasoning**, and it is very effective, drawing upon well-established "body geometry" and other aspects of embodied cognition.

---

The book describes this environment as a **microworld**: a place where a certain kind of knowledge can grow with ease, because of the basic materials that are ready-to-hand. 

For example, if you change the world such that one turtle can give another turtle instructions, suddenly a rich space of Kaledioscopic or fractal patterns becomes possible. 

Another microworld, in which turtles speak to each other with forces and are always in motion, lets children teach themselves Newtonian physics.

Children were soon thinking about what else could be added to turtle-nature and world-nature...

---

Related links:

- [Logo in the browser](http://logo.twentygototen.org)
- [An archive from Byte magazine, 1982](https://archive.org/stream/byte-magazine-1982-08/1982_08_BYTE_07-08_Logo#page/n0/mode/2up)

[An excellent explorable explanation by computing pioneer Alan Kay, from turtles to mindstorms and beyond](https://tinlizzie.org/tinkertoy/)
