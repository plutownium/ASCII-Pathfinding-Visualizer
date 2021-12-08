# ASCII-Pathfinding-Visualizer
Based off of "pathfinding visualizer" by Clement Mihailescu 

## Humble Beginnings

This project started many years ago when I was unconvinced that I could handle implementing a complicated algorithm.

It was indeed difficult at the time, though now I'm not convinced there's anything that hard about it in the first place.

## Using the app

https://plutownium.github.io/ASCII-Pathfinding-Visualizer/

Dijkstras is a pathfinding algorithm. To use the app, give it the biggest challenge you can by choosing from the Generate Maze Algorithms dropdown.

Or design your own!

Note that the "random maze" does not guarantee an available path; you'll have to click through to sculpt a path for the algorithm to follow.

## The design

I paid a UXUI dev $250 to make the design. Then I implemented the design using divs creatively. 

There was no hand holding library, just a technical question: How am I going to represent all of these boxes?

Inspect the page. You'll find that I have a lot, and I mean a lot, of divs on that page. A lot.

Have fun!


P.S. To increase how much you enjoy reading the code, see if you can spot the location where I lost days of my life hunting down a bug caused by arrays passing by reference in JavaScript. There is more than one potential location!
