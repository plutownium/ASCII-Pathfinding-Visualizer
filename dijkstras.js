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

	// store arrays of visited node coords here so your program can check values... helps w/ "and have not yet been visited" check
	let nextVisitsList = []; // go to these nodes
	let visitedNodesList = []; // don't go to these nodes

	let potentialPaths = [];

	let nodeContent;
	let scanTarget; // = finishedGrid[nextYCoord][nextXCoord]
	let loopContent;
	let iteration = 0;

	// [cycle start] start cycling through adjacent nodes
	while (nodeContent !== TARGET_NODE && iteration < 10) {
		// see https://docs.google.com/document/d/1kJzkln9Ye40Btx5OwGsN23HQ26TX3rjfpbJIDXeUg7g/edit for loop documentation
		// one loop thru this while loop will scan the nodes in all cardinal directions and act on them...
		console.log("[[[starting loop...]]]")
		// *** *** *** *** *** *** *** *** ***
		// BEGIN initialization of loop

		// startValueX and startValueY were already given values up on the previous lines for the first iteration.
		if (iteration > 0) {
			const index = iteration - 1;
			startCoordinates = nextNodes[index]
		}

		let startValueX = startCoordinates[0]
		let startValueY = startCoordinates[1]

		nodeContent = finishedGrid[startValueY][startValueX];

		// END initialization of loop
		// *** *** *** *** *** *** *** *** ***

		// Step 3 in documentation...
		// ### ### ### ### ### ### ### ### ### ### ### ### ### 
		// ### get the node directly to the right
		let adjacentNode = [startValueX + 1, startValueY]
		// use finishedGrid[y-coord][x-coord] as arg because we're pulling out the # symbol if it is there
		nextVisitsList = updateNextVisitsList(adjacentNode, nextVisitsList, finishedGrid[adjacentNode[1]][adjacentNode[0]], visitedNodesList)

		// ### ### ### ### ### ### ### ### ### ### ### ### ### 
		// ### get the node directly to the left
		adjacentNode = [startValueX - 1, startValueY]
		nextVisitsList = updateNextVisitsList(adjacentNode, nextVisitsList, finishedGrid[adjacentNode[1]][adjacentNode[0]], visitedNodesList)

		// ### ### ### ### ### ### ### ### ### ### ### ### ### 
		// ### get the node directly above
		adjacentNode = [startValueX, startValueY + 1]
		nextVisitsList = updateNextVisitsList(adjacentNode, nextVisitsList, finishedGrid[adjacentNode[1]][adjacentNode[0]], visitedNodesList)

		// ### ### ### ### ### ### ### ### ### ### ### ### ### 
		// ### get the node directly below
		adjacentNode = [startValueX, startValueY - 1]
		nextVisitsList = updateNextVisitsList(adjacentNode, nextVisitsList, finishedGrid[adjacentNode[1]][adjacentNode[0]], visitedNodesList)

		// Step 4 in documentation...
		// add Current Node to the list of Visited Nodes so the program knows to not go back here...
		visitedNodesList.push(startCoordinates)

		// Step 5... Record the distance from the Starting Node to the Current node & record the path used to get there...

		break;
		iteration = iteration + 1;

	}

	// after while loop, which *scans* for TARGET_NODE, use this following step to select teh shortest path to TARGET_NODE
	// step 5: Select the shortest path from the START_NODE to the TARGET_NODE & animate that path...


	// ONCE NON BUGGY: TURN rerenderGrid(); BACK ON!
	// finally, rerender the board based on the grid
	// rerenderGrid();
	// rerenderGridSlowly(); // work in progress...
}

function scanPerimeterNode(funcScanTarget, startNode, nextNode, visitedArray, nextArray) {
	// function is called "scanPerimeterNode" because it "scans" a node in the grid.
	let funcNodeContent;

	// "if the adjacent node isn't EITHER: (a) a wall segment or (b) already contained in the visitedNodes array..."
	// (because you don't want to visit the same node twice)
	console.log("testing values @ start of scanPerimeterNode:")
	console.log(visitedArray)
	console.log(nextNode)
	const nextNodeHasntBeenVisitedYet = !isArrayInArray(visitedArray, nextNode)
	// either (a) isArrayInArray is malfunctioning and telling me the array is in the array when it isn't
	// or (b) I have somehow pushed nextNode into visitedArray early
	// or (c) I am making a logical error: in other words, I believe I am correctly adding nodes to visitedArray when some shouldn't be
	// or (d) maybe the value i passe dinto isArrayInArray was wrong
	const nodeIsNotAWall = funcScanTarget != WALL_SEGMENT
	console.log("condition a: " + nodeIsNotAWall)
	console.log("condition b: " + nextNodeHasntBeenVisitedYet)

	if (nodeIsNotAWall && nextNodeHasntBeenVisitedYet) {
		funcNodeContent = funcScanTarget;

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		// so the algo doesn't scan it again when its at an adjacent node
		const currentNodeHasntBeenVisitedYet = !isArrayInArray(visitedArray, startNode)
		if (currentNodeHasntBeenVisitedYet) {
			visitedArray.push(startNode)
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		// so the algo knows where to go next
		const notPlanningToVisitNextNodeYet = !isArrayInArray(nextArray, nextNode)
		const funcScanTargetExists = (funcScanTarget != undefined)
		console.log("condition 1: " + notPlanningToVisitNextNodeYet)
		console.log("condition 2: " + funcScanTargetExists)
		console.log(funcScanTarget)
		if (notPlanningToVisitNextNodeYet && funcScanTargetExists) {
			console.log("Pushing to nextArray!")
			nextArray.push(nextNode)
		}

		// do i also have to pass the grid array so it can be accessed within the function? it seemed to work when i did
		// grid[y][x] = VISITED_NODE; up on the first line of the replaceEmptySpaceWithVisitedMarker...

		// finally, replace the node's visual appearance: convert . to o
		// so the user can tell what's going on in the code
		console.log("START NODE: ")
		console.log(startNode)
		console.log(grid[startNode[1]][startNode[0]])
		const gridSpaceIsEmpty = grid[startNode[1]][startNode[0]] === "."
		if (gridSpaceIsEmpty) {
			console.log("Changing a . to a o")
			replaceEmptySpaceWithVisitedMarker(startNode[0], startNode[1]);
			rerenderGrid();
		}
	}

	// had to pass arrays into the func to push to them, so i also have to return them out of the func 
	// to assign the value of the modified array to the original variable containing said array. A scope problem.
	return [visitedArray, nextArray, funcNodeContent]
}

function updateNextVisitsList(adjacentNode, nextVisitsArray, nodeContent, visitedNodesArray) {
	const alreadyVisited = isArrayInArray(visitedNodesArray, adjacentNode);

	// if the adjacent node is already in the list of Visited Nodes, do not add the adjacent node to the Next Visits List.
	if (alreadyVisited) {
		return nextVisitsArray // exit early because the adjacentNode is already visited and doesn't need to be added again
	} else {
		// don't put Wall segments on the nextVisitsList.
		const nodeIsWall = nodeContent === WALL_SEGMENT;
		// don't put a node on nextVisitsList twice.
		const alreadyPlanningToVisit = isArrayInArray(nextVisitsArray, adjacentNode)
		if (alreadyPlanningToVisit === false && nodeIsWall === false) {
			nextVisitsArray.push(adjacentNode)
		}
		return nextVisitsArray;
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