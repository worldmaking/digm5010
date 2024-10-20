<!--
{
	template: "slides.html"
}
-->

# Machines, Automata

---

- **Analog** (or Analogue) as an indexical representation, a proportional mapping of quantity or relation. Analog computers can use anything from hydraulics and mechanical systems through to chemical and electrical means to model problems. As an analog computer does not use discrete values, but rather continuous values, processes cannot be reliably repeated with exact equivalence, but sometimes offer alternative benefits of far higher resolution and response. 

- **Digital** literally from "fingers", for counting, tallying, arithmetic. The term was first suggested by George Robert Stibitz in 1937. It refers to where a signal, such as a voltage, is not used to directly represent a value (as it would be in an analog computer), but to *encode* it. Most digital representations are binary, for both numerical and logical (Boolean) computations. 

notes: Analog computing enjoyed a heydey from Lord Kelvin's tide-predicting machine (1872) through to fire-control systems in the two world wars. However in certain areas it is still used today, e.g. in many sound synthesizers.

---

- Lebombo bone tally stick, 35000 BCE, Swaziland/South Africa
- Abacus, 2700–2300 BCE, Babylonia
- Astrolabe and Antikythera mechanism, (c. 150–100 BC), from the Hellenistic world 
- Hero of Alexandria (c. 10–70 AD) made mechanical devices including automata and a programmable cart
- A hydropowered mechanical astronomical clock invented by Ismail al-Jazari in 1206, was the first programmable analog computer.
- Mechanical calculators by Wilhelm Shickard (1623) and Blaise Pascal (1642); Leibniz designs logic machines and 'reckoners' using binary systems (not built) 

---image:img/Hero_of_Alexandria.png

Hero of Alexandria (c. 10 AD – c. 70) was a Greek mathematician and engineer who is often considered the greatest experimenter of antiquity, and his work is representative of the Hellenistic scientific tradition. Hero published a well-recognized description of a steam-powered device called an aeolipile (sometimes called a "Hero engine"). Among his most famous inventions was a windwheel, constituting the earliest instance of wind harnessing on land, the first coin-operated vending machine, and a programmable cart that was powered by a falling weight. The "program" consisted of strings wrapped around the drive axle.

Among his literary works is "Automata", a description of machines which enable wonders in temples by mechanical or pneumatical means.

---image:img/gulliver.png

The Engine is a fictional device described in the 1726 satirical novel Gulliver's Travels by Jonathan Swift. It is possibly the earliest known reference to a device in any way resembling a modern computer. The Engine is a device that generates permutations of word sets.

"Every one knew how laborious the usual method is of attaining to arts and sciences; whereas, by his contrivance, the most ignorant person, at a reasonable charge, and with a little bodily labour, might write books in philosophy, poetry, politics, laws, mathematics, and theology, without the least assistance from genius or study."


---image:img/jacquardloom.jpg

Jacquard machine, invented in 1804, attaches to loom as a controller to produce complex patterns and weaves according to chain of replaceable punch-card instructions. Jacquard shedding made possible the automatic production of unlimited varieties of pattern weaving.

See also: piano roll

---image:img/Difference_engine_plate_1853.jpg

1833: After building a mechanical calculator ("Difference engine"), Charles Babbage designed a programmable computer ("Analytical engine") with both program and data using punched cards, that would have been the world's first Turing-complete machine, and a similar architecture to the von Neumann design underlying most computers today. 

---youtube:IXXoG2PqPOY

Babbage's machine was documented by Ada Lovelace, including the first written description of programming. Lovelace designed the first algorithm intended to be executed by a computer, corrected others' work, added proofs, and imagined its potential effects on society.

---image:img/Reprogramming_ENIAC.png

- The word "computer" was a job title assigned to primarily women who used mechanical or electromechanical calculators, cash registers, and accounting machines. By 1943, almost all people employed as computers were women. A kilogirl of energy was "equivalent to roughly a thousand hours of computing labor." The programmers of the ENIAC computer in 1944 were six female mathematicians; since designing hardware was "men's work" and programming software was "women's work." 

- Edith Clarke was the first woman to earn a degree in electrical engineering, and filed a patent in 1921 for a graphical calculator to be used in solving problems in power lines.
- A team of mostly women cracked German Enigma __code__ while at Bletchley Park, hepling turn the tide of the 2nd World War, along with mathematicians including Alan Turing.
- [Grace Hopper](https://en.wikipedia.org/wiki/Grace_Hopper) was the first person to design a compiler for a programming language. Hopper not only programmed the Harvard Mark 1, but created a 500-page comprehensive manual for it (for which she was not credited). 
- Kathleen Booth developed Assembly Language.
- In 1959 Mary K. Hawes convened a group, including Hopper, to design a common programming language shared between business, which became COBOL, still in use today.
- Margaret Hamilton programmed the software for the Apollo mission onboard computers. 

- By the end of the 1960s programmers were no longer predominantly women, and few were promoted to leadership roles; gender disparity in computing remains quite severe in many countries today.

---image:img/universal_turing_machine.png

The "Turing Machine" was originally an abstract reformulation of Gödel's incompletness theorem about the limits of proof and computability/decidability (that in any formal system, there are 'statements' that cannot be proved/decided within that system). Note: Gödel's proof depended on a digital encoding, by turning algebraic statements into numbers. That is, the 'data' (numbers) and the 'operations' (e.g. `+`) are flattened to the same ontological level. 

---

By saying that we can represent mathematical procedures as *numbers*, Turing showed how math can operate on itself. 

This was the genius step that also effectively makes tools into computers: 

**code = data**

Data can be read, and executed, as code. Code can modify data. 

What are the implications of this?

----

As a mathematician, Turing was interested in theoretical limits. 

"It is possible to invent a single machine which can be used to compute **any** computable sequence. If this machine U is supplied with a tape on the beginning of which is written the S.D ["standard description" of an action table] of some computing machine M, then U will compute the same sequence as M." Alan Turing 1936, in Davis, Martin (2000), Engines of Logic: Mathematicians and the origin of the Computer.

This is the "Universal Turing Machine" (UTM). Since no formal computing machine can compute something beyond what a UTM can, then the limits of computablity of a UTM apply to **all** such computing machines. That is, in theory, no computing machine can solve more problems than a UTM; anything that can be "computed" can be computed by a UTM. 

...in theory there's no difference between theory and practice... 

The UTM itself is an abstract idea, and doesn't physically exist, since it includes in its definition the possibility of infinite space (memory) and time (operations). 

notes:

The universal computing machine was simultaneously invented by [Emil Post](https://en.wikipedia.org/wiki/Emil_Leon_Post), also in 1936, based on string rewriting. It should really be called the Post-Turing Machine.

---image:img/metalinguistic_abstraction.png


A near-equivalent (and arguably more elegant) model to the Post-Turing Machine was also put forward in the 1930's by Alonzo Church, in the form of the [Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus), which flattens the ontology to functions rather than to numbers. The Lambda Calculus is the root of all functional programming languages such as LISP, Scheme, Haskell etc.

This image taken from a wonderfully mind-blowing textbook on functional programming using Scheme: [Abelson, Harold, and Gerald Jay Sussman. Structure and interpretation of computer programs. The MIT Press, 1996.](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book.html) -- the entire book is online.

---

There's something else profound hidden in the Post-Turing UTM (and the Lambda calculus): 

Given the data that describes a machine "M", a UTM will then compute the same sequence as "M". So,

> "Computers should be viewed as second-order machines–given the formal specification of a first-order machine, they will ‘become’ that machine." 

notes: 

Christopher Langton, C. G. Artificial Life: An Overview. MIT Press, Cambridge, MA, USA, 1995.

---youtube:WkI_Vbwn14g


---image:img/vonneumannarchitecture.png

Today's digital machines all have what is known as the "von Neumann" architecture, after John von Neumann, which may have been influenced by the Turing Machine. The key insight is that the **program is data** that the machine chews its way through step by step, as if enacting the eternally recurring question of 'what to do next':

- memory stores both data **and** instructions (**stored program**), 
- process moves by a **program counter** to fetch next instruction, 
- data (math/logic/memory/IO/etc) operations use the same bus to enact the instruction, modifying memory and/or program counter

von Neumann, John (1945), [First Draft of a Report on the EDVAC](https://web.archive.org/web/20130314123032/http://qss.stanford.edu/~godfrey/vonNeumann/vnedvac.pdf)

---image:img/67-rechender-raum.jpg

Again, this was also anticipated back in 1937, by [Konrad Zuse](https://en.wikipedia.org/wiki/Konrad_Zuse), who submitted two patent applications in which machine instructions could be stored in the same storage used for data. 

Zuse wanted to be an artist but was forced by his family into civil engineering; rather than design aircraft engines by doing the math on paper, he created computing machines to do it for him, despite being in total isolation from other researchers until after World War II. 

Zuse created one of the first plotters, used by early computer artist Frieder Nake in the early 1960's, and went on to suggest that the universe is a giant cellular automaton. 


---youtube:My8AsV7bA94


---image:img/500px-Snakes_and_Ladders.jpg

One thing that makes computers more intersting than mechanical looms is the way they can redirect themselves as they chew through the instructions: the **control flow**. There are a few common structures of control flow, such as `goto`, `if`, etc. Sometimes it's useful to understand these structures as if they are played out on a board game, with memory being stacks of cards, the instructions being the board, etc.

If the program-data is a board of cells ordinarily stepped through one-by-one (sequential flow), then `goto` is like the snakes and ladders: a jump that must be taken. In the 1970's `goto` became "considered harmful" as a common source of tangled bugs, making code harder to maintain or reason about; instead it was hidden in all kinds of control structures we use today such as `if`, `switch`, `break`, `while`, `for`, and so on.

"Computed jumps" mean "jump by `x` steps" or "jump to space `x`", where `x` is a variable numeric value in memory. Such instructions exist in assembly languages but are hidden in higher-languages; they underlie `function` and `return` as well as delegation (inheritance) and dynamic linking. 

"Conditional jumps" mean "jump by n steps if `x` is nonzero" or "jump to space n if `x` is nonzero", where `x` is some value in memory. (Monopoly: "if you draw this card, go to jail".) `if` is a conditional **forward** jump; skipping ahead a certain amount if a condition is true or false. `switch` is a chain of `if`s. `while` is a conditional **backward** jump; jumping back to redo instructions if a condition is true; providing the basis for iteration/recursion. `for` is just a more specific `while`.

Parallelism just means multiple instruction pointers and memory context -- like having multiple players on the board, each with their own set of cards. If players take turns, this is determinately interleaved, known as **coroutines**. If players all play simultaneously without taking turns, then these are indeterminately interleaved, known as **threads** (or sometimes "interrupts"). Coroutines exist in modern javascript via `async` and `await`, threads via web workers. 

Perhaps the most striking form of control flow--though not always considered as such--is the ability to modify data and then 'jump into it' as a new bit of program. As if "[rewriting the rules of the game while playing](https://www.looneylabs.com/games/fluxx)". This kind of ability is normally limited as a security risk, but still is required for dynamic loading (libraries). It exists in Javascript via `eval` and `new Function`. It's also necessary for machines to construct/become other machines.

(A wonderful summary of these concepts is [Fisher, David A. "A survey of control structures in programming languages." ACM SIGPLAN Notices 7.11 (1972): 1-13.](https://dl.acm.org/doi/pdf/10.1145/987361.987363?casa_token=ok8oYYAQkTcAAAAA:O3WZ7upUTpQrrjpFIIHstf2UGtlBkbq1SNdfjk2-HsjldXWvIfdfJvoQpZZvs10QYJLJf3qr2TxL5g))



---

For a moment, don't think of a program as a tool, but as a pattern of data, a string of bits. This is clearer in data-driven representations of programs, e.g. state machine tables, or cellular automata images. 

- If different interpreter-programs read the same string of bits but do different things, where are the semantics? 
- If an interpreter-program reads the string of bits to become a different interepreter-program, where are the semantics?




---image:img/neumanUniversalConstructor.png

In the 1940s [John von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_universal_constructor) also explored theoretical possibility of machines that can construct other machines, including replicating themselves or producing more complex machines than themselves. He demonstrated such a universal constructor using a 2D cellular automaton.

(He also developed models for artificial neurons.)

Can you make a self-reproducing machine?

---youtube:2iDc4C6vbcc

Decades later Christopher Langton proposed a more concise self-reproducing CA, which has since been further improved upon using artificial evolutionary techniques.

---

> Computation comprises "Mechanisms in which things build other things. Such ‘things’ are processes."

Fontana, W., Wagner, G. and Buss, L. W. Beyond Digital Naturalism. Artificial Life, 1 & 2. MIT Press, 1994. 

---

- If any string of data (whether words, numbers, symbols, or just bits) can be *interpeted* as a program, can we generate *random* programs?
- What kinds of behaviours can we expect from *random* programs? 

---image:img/wolfram_all_rules.png

Stephen Wolfram explored such questions by considering the evolution of simple 1D cellular automata. 

How would you do it?

--- 

- How can you make a generator of *interesting* random programs?
- What does *interesting* mean?




---image:img/yinyang-bg.png

data & code

theory & practice

? & ?


