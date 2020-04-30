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

	// TODO: Implement a way to assign "distance" to a node.

	// TODO: Add a way for user to REMOVE a wall segment and return it to "." status

	// TODO: Build an array that fills up with potential paths through the Grid, each one expanding node by node, until
	// one of the paths encounters the TARGET_NODE. The *first* one to encounter TARGET_NODE should be the one selected
	// for highlighting by + signs (the path indicator). This should work...

	// step 2: get list of adjacent nodes that have not yet been visited. 
	// Adjacent nodes have the form: [x + 1, y] | [x - 1, y] | [x, y + 1], | [x, y - 1] AND have not yet been visited

	// define params for grid coordinates being valid (used in a conditional check later)
	const maxXValue = finishedGrid[0].length - 1;
	const maxYValue = finishedGrid.length - 1;
	const minXValue = 0;
	const minYValue = 0;

	let startValueX; // initialize these outside of the while loop because they are also used after it
	let startValueY;

	// store arrays of visited node coords here so your program can check values... helps w/ "and have not yet been visited" check
	let nextVisitsList = []; // go to these nodes
	// note: nextVisitsList contains values [x,y,a,b] where [a,b] is the node that was Current when node [x,y] was added to the list.
	let visitedNodesList = []; // don't go to these nodes

	let potentialPaths = []; // an array of Path objects...

	let nodeContent;

	let iteration = 0;

	// [cycle start] start cycling through adjacent nodes
	// removed while(nodeContent !== TARGET_NODE) because there is an if/break block at the end that takes care of exiting loop
	while (iteration < 30) {
		// see https://docs.google.com/document/d/1kJzkln9Ye40Btx5OwGsN23HQ26TX3rjfpbJIDXeUg7g/edit for loop documentation
		// one loop thru this while loop will scan the nodes in all cardinal directions and act on them...
		// console.log("[[[starting loop...]]]")
		// *** *** *** *** *** *** *** *** ***
		// BEGIN initialization of loop

		// for the first iteration, startValueX and startValueY were already given values up on the previous lines.
		if (iteration > 0) {
			const index = iteration - 1;
			startCoordinates = nextVisitsList[index] // will yield values like [x, y, a, b] (see Google Docs documentation for more)
		}

		startValueX = startCoordinates[0]
		startValueY = startCoordinates[1]
		// END initialization of loop
		// *** *** *** *** *** *** *** *** ***

		// Step 3 in documentation...
		// ### get the node directly to the right
		let adjacentNode = [startValueX + 1, startValueY]
		// confirm the adjacentNode is on the grid and therefore will exist.
		let isOnTheGrid =
			adjacentNode[0] <= maxXValue && adjacentNode[0] >= minXValue &&
			adjacentNode[1] <= maxYValue && adjacentNode[1] >= minYValue
		if (isOnTheGrid) {
			// use finishedGrid[y-coord][x-coord] as arg because we're pulling out the # symbol if it is there
			nextVisitsList = updateNextVisitsList(adjacentNode, nextVisitsList, finishedGrid[adjacentNode[1]][adjacentNode[0]], visitedNodesList, startCoordinates)
		}

		// ### get the node directly to the left
		adjacentNode = [startValueX - 1, startValueY]
		isOnTheGrid =
			adjacentNode[0] <= maxXValue && adjacentNode[0] >= minXValue &&
			adjacentNode[1] <= maxYValue && adjacentNode[1] >= minYValue
		if (isOnTheGrid) {
			nextVisitsList = updateNextVisitsList(adjacentNode, nextVisitsList, finishedGrid[adjacentNode[1]][adjacentNode[0]], visitedNodesList, startCoordinates)
		}

		// ### get the node directly above
		adjacentNode = [startValueX, startValueY + 1]
		isOnTheGrid =
			adjacentNode[0] <= maxXValue && adjacentNode[0] >= minXValue &&
			adjacentNode[1] <= maxYValue && adjacentNode[1] >= minYValue
		if (isOnTheGrid) {
			nextVisitsList = updateNextVisitsList(adjacentNode, nextVisitsList, finishedGrid[adjacentNode[1]][adjacentNode[0]], visitedNodesList, startCoordinates)
		}

		// ### get the node directly below
		adjacentNode = [startValueX, startValueY - 1]
		isOnTheGrid =
			adjacentNode[0] <= maxXValue && adjacentNode[0] >= minXValue &&
			adjacentNode[1] <= maxYValue && adjacentNode[1] >= minYValue
		if (isOnTheGrid) {
			nextVisitsList = updateNextVisitsList(adjacentNode, nextVisitsList, finishedGrid[adjacentNode[1]][adjacentNode[0]], visitedNodesList, startCoordinates)
		}

		// Step 4 in documentation...
		// add Current Node to the list of Visited Nodes so the program knows to not go back here...
		// but only add Current Node if it ISN'T already on the list...
		const currentNodeIsInVisitedNodesList = isArrayInArray(visitedNodesList, [startCoordinates[0], startCoordinates[1]])
		if (!currentNodeIsInVisitedNodesList) {
			visitedNodesList.push(startCoordinates)
		}

		// Step 5... Record the distance from the Starting Node to the Current node & record the path used to get there...
		if (iteration == 0) { // while iteration==0, STARTING_NODE===CurrentNode, so it's unique: There is no path to get there.
			const firstEntry = [startValueX, startValueY]
			const initPath = new Path(0, [], firstEntry, false)

			potentialPaths.push(initPath)
		} else { // block summary: generate a new Path to add to potentialPaths
			// startCoordinates = nextVisitsList[index] at the start of the loop.
			// remember nextVisitsList contains values like [x, y, a, b]
			const previousNodeCoordinates = [startCoordinates[2], startCoordinates[3]]

			const pathToNode = locatePathToCurrentNode(potentialPaths, previousNodeCoordinates, iteration)
			const isTarget = finishedGrid[startValueY][startValueX] === TARGET_NODE;
			const currentPath = [...pathToNode.path]
			console.log("currentPath length: " + currentPath.length)
			const newPath = new Path(pathToNode.distance + 1, currentPath, [startValueX, startValueY], isTarget)
			potentialPaths.push(newPath)
		}
		// FIXME: current code causes a burdensome loop. currentPath length of 7 has looped 4,700 times & 8 looped 8000 times
		// and the TARGET_NODE still isn't found. something is wrong. TEST: install safeguards against recycling old nodes

		// Step 6: if the CurrentNode is not the TargetNode, change it from . to o in the Grid, then cycle back to step 2
		if (finishedGrid[startValueY][startValueX] === TARGET_NODE) {
			break
		} else {
			if (finishedGrid[startValueY][startValueX] !== START_NODE) {
				finishedGrid[startValueY][startValueX] = VISITED_NODE;
			}
			iteration = iteration + 1;
		}
		// TODO: Figure out how to pass an array w/ the nodes in order of which they were scanned to a renderGridSlowly() func.
		// TODO: write a renderGridSlowly() func and animate the scanning process.
		// TODO: use the renderGridSlowly() func to animate the shortest path.
		// TODO: Alternatively, figure out how to pass the coords to be rendered via a func that builds a list to render slowly.
	}

	// after while loop, which *scans* for TARGET_NODE, use this following step to select teh shortest path to TARGET_NODE
	// step 7: Select the shortest path from the START_NODE to the TARGET_NODE & animate that path...

	console.log("visitedNodesList length: " + visitedNodesList.length)
	console.log("nextVisitsList length: " + nextVisitsList.length)
	console.log(nextVisitsList)
	console.log(potentialPaths)
	console.log(potentialPaths.length)
	const shortestPathObject = potentialPaths[potentialPaths.length - 1]; // should be the last 1...

	// FIXME: shortestPathObject is messed up.
	// if START_NODE = [2, 2] and TARGET_NODE = [4, 2], expect values...
	// distance = 2
	// containsTarget = true
	// lastEntry = [3, 2]
	// .path[path.length - 1] = [4, 2] and .path.length = 3
	// FIXME: Almost guarantee that shortestPathObject will not obey the Wall segments.
	// TODO: Test code with Wall Segments inserted. Does shortestPath describe trail around wall segments?
	console.log(shortestPathObject)

	rerenderGrid();

	return shortestPathObject

	// finally, rerender the board based on the grid
	// rerenderGridSlowly(); // work in progress...
}

function locatePathToCurrentNode(paths, previousNodeCoords, iteration) {
	// searches list of Paths for the right Path object and returns it.
	// the right path should be the one where the .lastEntry property is === previousNodeCoords as a string.

	// NOTE: lastEntry is currentPath[-1], meaning, it's the node that LEAD TO the CurrentNode

	// this conditional retrieves the init Path if it is the only one in the paths argument
	if (paths[paths.length - 1].lastEntry === null) {
		return paths[0] // actually pull out the Path object from the array...
	}
	// TODO: More thoroughly explore why paths.filter() sometimes yields two Path objects. Understand what is meant to happen
	const correctPath = paths.filter(entry => JSON.stringify(entry.lastEntry) === JSON.stringify(previousNodeCoords))
	// console.log("correctPath length: " + correctPath.length)

	return correctPath[correctPath.length - 1] // pretty sure when there's two potential correctPaths, you take the last one...
}

function updateNextVisitsList(adjacentNode, nextVisitsArray, adjNodeContent, visitedNodesArray, currentNode) {
	const alreadyVisited = isArrayInArray(visitedNodesArray, adjacentNode);
	// FIXME: 100% pushing too many times to the nextVisitsList & visitedNodesList
	// TODO: Reduce looping from 335 loops for currentPath.length = 5 to ~24 to ~40. totally doable
	const newNextVisits = [...nextVisitsArray]

	// if the adjacent node is already in the list of Visited Nodes, do not add the adjacent node to the Next Visits List.
	if (alreadyVisited) {
		return newNextVisits // exit early because the adjacentNode is already visited and doesn't need to be added again
	} else {
		// don't put Wall segments on the nextVisitsList.
		const nodeIsWall = adjNodeContent === WALL_SEGMENT;
		// don't put a node on nextVisitsList twice.
		const alreadyPlanningToVisit = isArrayInArray(newNextVisits, adjacentNode)
		if (alreadyPlanningToVisit === false && nodeIsWall === false) {
			// see "the potentialPaths Data Structure" in Google Docs documentation for more info...
			const nextVisitsInfo = [adjacentNode[0], adjacentNode[1], currentNode[0], currentNode[1]]
			newNextVisits.push(nextVisitsInfo)
		}
		return newNextVisits;
	}
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
}

// TODO: split up big function into smaller functions

// -------------

// TODO: Add a delay between each "visited" indicator being added to the board.

// TODO: Figure out how to animate the change in the board .... sloooowly...
// PLAN: Replace the value of the node in the Grid with a "Visited" marker.
// ONLY ONCE the grid is finished being re-computed w/ visited spaces, and the while loop is finished...
// THEN you pass the grid to a function that goes, "Animate a change every n milliseconds"

// IDEA: use a for loop to set async code, 1 execution for each node in the grid, delayed by an increasing
// amount of time with each node. 200, 400, 600, 800 etc. should work even tho its n * m async calls