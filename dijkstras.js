// dijkstras() works with a grid that looks like...
const exampleGrid = [
	[".", ".", ".", ".", ".", ".", ".", "."],
	[".", "*", ".", ".", ".", ".", ".", "."],
	[".", ".", ".", ".", ".", ".", ".", "."],
	[".", "X", ".", ".", ".", ".", ".", "."],
	[".", ".", ".", ".", ".", ".", ".", "."]
]

function dijkstras(finishedGrid) {
	// step 1: confirm there is both a Start Node and a Target Node & get start coordinates
	let startNodeExists = false;
	let targetNodeExists = false;
	let startCoordinates;
	for (let x = 0; x < finishedGrid[0].length; x++) {
		for (let y = 0; y < finishedGrid.length; y++) {
			if (finishedGrid[y][x] === START_NODE) {
				startNodeExists = true;
				startCoordinates = [x, y]
			}
			if (finishedGrid[y][x] === TARGET_NODE) {
				targetNodeExists = true;
			}
		}
	}
	if (startNodeExists === false || targetNodeExists === false) {
		console.log("Place start node & target node");
		return "Place start node & target node";
	}

	// step 2: get list of adjacent nodes that have not yet been visited. 
	// Adjacent nodes have the form: [x + 1, y] | [x - 1, y] | [x, y + 1], | [x, y - 1] AND have not yet been visited

	// store arrays of visited node coords here so your program can check values... helps w/ "and have not yet been visited" check
	let visitedNodes = [];
	// also need to store "distance to adjacent node" somehow once program gets there
	let distanceToNodes = [];

	// check if node is the Target node. if nodeContent is Target node, we're done "searching" and now have to pick out a route
	let nodeContent;

	// make a list of nodes to visit next...
	let nextNodes = [];

	// [cycle start] start cycling through adjacent nodes
	let startValueX = startCoordinates[0]
	let startValueY = startCoordinates[1]

	let nextXCoord;
	let nextYCoord;
	let adjacentNode; // = finishedGrid[nextYCoord][nextXCoord]

	let iteration = 0;
	let loopContent;

	let maxXValue = finishedGrid[0].length - 1;
	let maxYValue = finishedGrid.length - 1;

	// FIXME: e.g. Uncaught TypeError: Cannot read property '2' of undefined when running algo. suspicious its
	// from the algo trying to find e.g. grid[-1][2] which obviously does not exist as there is no negative index of the grid
	// FIXME: while loop runs past TARGET_NODE without stopping
	// TODO: Implement a way to assign "distance" to a node.

	// TODO: Add a way for user to REMOVE a wall segment and return it to "." status

	// TODO: Build an array that fills up with potential paths through the Grid, each one expanding node by node, until
	// one of the paths encounters the TARGET_NODE. The *first* one to encounter TARGET_NODE should be the one selected
	// for highlighting by + signs (the path indicator). This should work...
	while (nodeContent !== TARGET_NODE && iteration < 10) {
		console.log("[[[starting loop...]]]")
		// do nothing for "iteration == 0" because startValueX and startValueY were already given values up on 
		// the previous lines for the first iteration.
		if (iteration > 0) {
			const index = iteration - 1;
			startCoordinates = nextNodes[index]
			console.log(nextNodes)
			console.log("index value: " + index);
			console.log("START COORDS: " + startCoordinates);
		}

		startValueX = startCoordinates[0]
		startValueY = startCoordinates[1]

		// if (iteration % 4 == 0) {
		// 	// ### get the node directly to the right
		// 	nextXCoord = startValueX + 1
		// 	nextYCoord = startValueY
		// } else if (iteration % 4 == 1) {
		// 	// ### get the node directly to the left
		// 	nextXCoord = startValueX - 1
		// 	nextYCoord = startValueY
		// } else if (iteration % 4 == 2) {
		// 	// ### get the node directly above
		// 	nextXCoord = startValueX
		// 	nextYCoord = startValueY + 1
		// } else {
		// 	// ### get the node directly below
		// 	nextXCoord = startValueX
		// 	nextYCoord = startValueY - 1
		// }

		const coordsAreOnTheGrid = nextYCoord < 0 && nextXCoord < 0 && nextYCoord > maxYValue && nextXCoord > maxXValue;
		if (coordsAreOnTheGrid) {
			adjacentNode = undefined;
			console.log(nextYCoord, nextXCoord);
			console.log("UNDEFINED!")
		} else {
			adjacentNode = finishedGrid[nextYCoord][nextXCoord]
		}

		// loopContent = nodeLoop(adjacentNode, [nextXCoord, nextYCoord], [startValueX, startValueY], visitedNodes, nextNodes);
		// visitedNodes = loopContent[0];
		// nextNodes = loopContent[1];
		// nodeContent = loopContent[2];


		iteration = iteration + 1;
	}
	// finally, rerender the board based on the grid
	rerenderGrid();
	// rerenderGridSlowly(); // work in progress...
}

// https://stackoverflow.com/questions/41661287/how-to-check-if-an-array-contains-another-array
function isArrayInArray(arr, item) {
	var item_as_string = JSON.stringify(item);

	var contains = arr.some(function (ele) {
		return JSON.stringify(ele) === item_as_string;
	});
	return contains;
}

function replaceEmptySpaceWithVisitedMarker(emptyXCoord, emptyYCoord) {
	grid[emptyYCoord][emptyXCoord] = VISITED_NODE;
	// rerenderGrid();
}

// TODO: Refactor !isArrayInArray() to remove the irritating ! flip
function nodeLoop(adjacentNode, nextNode, startNode, visitedArray, nextArray) {
	// function is called "nodeLoop" because it "loops" over a node in the grid.
	let funcNodeContent;

	// "if the adjacent node isn't EITHER: (a) a wall segment or (b) already contained in the visitedNodes array..."
	// (because you don't want to visit the same node twice)
	console.log("TEST:")
	console.log(visitedArray)
	console.log(nextNode)
	const nextNodeHasntBeenVisitedYet = !isArrayInArray(visitedArray, nextNode)
	// either (a) isArrayInArray is malfunctioning and telling me the array is in the array when it isn't
	// or (b) I have somehow pushed nextNode into visitedArray early
	// or (c) I am making a logical error: in other words, I believe I am correctly adding nodes to visitedArray when some shouldn't be
	// or (d) maybe the value i passe dinto isArrayInArray was wrong
	const nodeIsNotAWall = adjacentNode != WALL_SEGMENT
	console.log("condition a: " + nodeIsNotAWall)
	console.log("condition b: " + nextNodeHasntBeenVisitedYet)
	if (nodeIsNotAWall && nextNodeHasntBeenVisitedYet) {
		funcNodeContent = adjacentNode;

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		const currentNodeHasntBeenVisitedYet = !isArrayInArray(visitedArray, startNode)
		if (currentNodeHasntBeenVisitedYet) {
			visitedArray.push(startNode)
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		const notPlanningToVisitNextNodeYet = !isArrayInArray(nextArray, nextNode)
		const adjacentNodeExists = (adjacentNode != undefined)
		console.log("condition 1: " + notPlanningToVisitNextNodeYet)
		console.log("condition 2: " + adjacentNodeExists)
		if (notPlanningToVisitNextNodeYet && adjacentNodeExists) {
			console.log("Pushing to nextArray!")
			nextArray.push(nextNode)
		}

		// do i also have to pass the grid array so it can be accessed within the function? it seemed to work when i did
		// grid[y][x] = VISITED_NODE; up on the first line of the replaceEmptySpaceWithVisitedMarker...

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startNode[1]][startNode[0]] === ".") {
			replaceEmptySpaceWithVisitedMarker(startNode[0], startNode[1]);
		}
	}

	// had to pass arrays into the func to push to them, so i also have to return them out of the func 
	// to assign the value of the modified array to the original variable containing said array. A scope problem.
	return [visitedArray, nextArray, funcNodeContent]
}


// FIXME: It seems like there's some "overflow" going on... I'm suspicious something like this is happening:
// When the algorithm encounters the edge of the grid, it adds that location value thats out in the abyss to the nextNodes
// search list. I think this because there was a hell of a lot of spaces filled up in one of my tests.
// TODO: Add a delay between each "visited" indicator being added to the board.

// TODO: Figure out how to animate the change in the board .... sloooowly...
// PLAN: Replace the value of the node in the Grid with a "Visited" marker.
// ONLY ONCE the grid is finished being re-computed w/ visited spaces, and the while loop is finished...
// THEN you pass the grid to a function that goes, "Animate a change every n milliseconds"

// IDEA: use a for loop to set async code, 1 execution for each node in the grid, delayed by an increasing
// amount of time with each node. 200, 400, 600, 800 etc. should work even tho its n * m async calls