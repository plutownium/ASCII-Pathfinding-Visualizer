function dijkstras(finishedGrid) {
	// step 1: confirm there is both a Start Node and a Target Node & get start coordinates
	let startNodeExists = false;
	let targetNodeExists = false;
	let startCoords;
	for (let x = 0; x < finishedGrid[0].length; x++) {
		for (let y = 0; y < finishedGrid.length; y++) {
			if (finishedGrid[y][x] === START_NODE) {
				startNodeExists = true;
				startCoords = [x, y]
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
	// console.log(startNodeExists, targetNodeExists, startCoords);

	// step 2: get list of adjacent nodes that have not yet been visited. 
	// Adjacent nodes have the form: [x + 1, y] | [x - 1, y] | [x, y + 1], | [x, y - 1] AND have not yet been visited
	let visitedNodes = []; // store arrays of visited node coords here so your program can check values
	// also need to store "distance to adjacent node" somehow once program gets there
	let distanceToNodes = [];

	// check if node is the Target node. if nodeContent is Target node, we're done "searching" and now have to pick out a route
	let nodeContent;

	// make a list of nodes to visit next...
	let nextNodes = [];

	// ### CYCLE start
	// start cycling through adjacent nodes
	let startValueX = startCoords[0]
	let startValueY = startCoords[1]

	// ### get the node directly to the right
	let nextXCoord = startValueX + 1
	let nextYCoord = startValueY
	let adjacentNode = grid[nextYCoord][nextXCoord]

	let x = 0;
	let loopContent;

	let maxXValue = finishedGrid[0].length - 1;
	let maxYValue = finishedGrid.length - 1;

	while (nodeContent != TARGET_NODE) {
		// FIXME: e.g. Uncaught TypeError: Cannot read property '2' of undefined when running algo. suspicious its
		// from the algo trying to find e.g. grid[-1][2] which obviously does not exist as there is no negative index of the grid
		// FIXME: while loop runs past TARGET_NODE without stopping
		// TODO: Implement a way to assign "distance" to a node.

		// TODO: Add a way for user to REMOVE a wall segment and return it to "." status

		// TODO: Build an array that fills up with potential paths through the Grid, each one expanding node by node, until
		// one of the paths encounters the TARGET_NODE. The *first* one to encounter TARGET_NODE should be the one selected
		// for highlighting by + signs (the path indicator). This should work...

		if (x == 0) {
			// do nothing because startValueX and startValueY were already given values up on 
			// the previous lines for the first iteration.
		} else {
			startCoords = nextNodes[x - 1]
		}

		startValueX = startCoords[0]
		startValueY = startCoords[1]

		// ### get the node directly to the right
		nextXCoord = startValueX + 1
		nextYCoord = startValueY

		if (nextYCoord < 0 || nextXCoord < 0 || nextYCoord > maxYValue || nextXCoord > maxXValue) {
			adjacentNode = undefined;
			console.log(nextYCoord, nextXCoord);
			console.log("UNDEFINED!")
		} else {
			adjacentNode = grid[nextYCoord][nextXCoord]
		}

		loopContent = nodeLoop(adjacentNode, nextXCoord, nextYCoord, startValueX, startValueY, visitedNodes, nextNodes);
		visitedNodes = loopContent[0];
		nextNodes = loopContent[1];
		nodeContent = loopContent[2];

		// ### get the node directly to the left
		nextXCoord = startValueX - 1
		nextYCoord = startValueY

		if (nextYCoord < 0 || nextXCoord < 0 || nextYCoord > maxYValue || nextXCoord > maxXValue) {
			adjacentNode = undefined;
			console.log(nextYCoord, nextXCoord);
			console.log("UNDEFINED!")
		} else {
			adjacentNode = grid[nextYCoord][nextXCoord]
		}

		loopContent = nodeLoop(adjacentNode, nextXCoord, nextYCoord, startValueX, startValueY, visitedNodes, nextNodes);
		visitedNodes = loopContent[0];
		nextNodes = loopContent[1];
		nodeContent = loopContent[2];

		// ### get the node directly above
		nextXCoord = startValueX
		nextYCoord = startValueY + 1

		// FIXME: Condition should also include, "if nextYCoord or NextXCoord > max width or height of grid"
		if (nextYCoord < 0 || nextXCoord < 0 || nextYCoord > maxYValue || nextXCoord > maxXValue) {
			adjacentNode = undefined;
			console.log(nextYCoord, nextXCoord);
			console.log("UNDEFINED!")
		} else {
			adjacentNode = grid[nextYCoord][nextXCoord]
		}

		loopContent = nodeLoop(adjacentNode, nextXCoord, nextYCoord, startValueX, startValueY, visitedNodes, nextNodes);
		visitedNodes = loopContent[0];
		nextNodes = loopContent[1];
		nodeContent = loopContent[2];

		// ### get the node directly below
		nextXCoord = startValueX
		nextYCoord = startValueY - 1

		if (nextYCoord < 0 || nextXCoord < 0 || nextYCoord > maxYValue || nextXCoord > maxXValue) {
			adjacentNode = undefined;
			console.log(nextYCoord, nextXCoord);
			console.log("UNDEFINED!")
		} else {
			adjacentNode = grid[nextYCoord][nextXCoord]
		}

		loopContent = nodeLoop(adjacentNode, nextXCoord, nextYCoord, startValueX, startValueY, visitedNodes, nextNodes);
		visitedNodes = loopContent[0];
		nextNodes = loopContent[1];
		nodeContent = loopContent[2];

		x = x + 1;
	}

	rerenderGridSlowly();

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


function nodeLoop(adjacentNode, nextXCoord, nextYCoord, initValX, initValY, visitedArray, nextArray) {
	// function so called because it "loops" over a node in the grid.
	let funcNodeContent;

	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedArray, [nextXCoord, nextYCoord])) {
		funcNodeContent = adjacentNode;

		if (!isArrayInArray(visitedArray, [initValX, initValY])) {
			visitedArray.push([initValX, initValY])
		} initValX

		// FIXME: It seems like there's some "overflow" going on... I'm suspicious something like this is happening:
		// When the algorithm encounters the edge of the grid, it adds that location value thats out in the abyss to the nextNodes
		// search list. I think this because there was a hell of a lot of spaces filled up in one of my tests.
		// TODO: Add a delay between each "visited" indicator being added to the board.
		if (!isArrayInArray(nextArray, [nextXCoord, nextYCoord]) && (adjacentNode != undefined)) {
			nextArray.push([nextXCoord, nextYCoord])
		}

		// do i also have to pass the grid array so it can be accessed within the function? it seemed to work when i did
		// grid[y][x] = VISITED_NODE; up on the first line of the replaceEmptySpaceWithVisitedMarker...
		if (grid[initValY][initValX] === ".") {
			replaceEmptySpaceWithVisitedMarker(initValX, initValY);
			// TODO: Figure out how to animate the change in the board .... sloooowly...
			// PLAN: Replace the value of the node in the Grid with a "Visited" marker.
			// ONLY ONCE the grid is finished being re-computed w/ visited spaces, and the while loop is finished...
			// THEN you pass the grid to a function that goes, "Animate a change every n milliseconds"

		}
	}

	// had to pass arrays into the func to push to them, so i also have to return them out of the func 
	// to assign the value of the modified array to the original variable containing said array. A scope problem.
	return [visitedArray, nextArray, funcNodeContent]
}


