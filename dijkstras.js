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
	const visitedNodes = []; // store arrays of visited node coords here so your program can check values
	// also need to store "distance to adjacent node" somehow once program gets there
	let distanceToNodes = [];

	// check if node is the Target node. if nodeContent is Target node, we're done "searching" and now have to pick out a route
	let nodeContent;

	// make a list of nodes to visit next...
	const nextNodes = [];

	// ### CYCLE start
	// start cycling through adjacent nodes
	let startValueX = startCoords[0]
	let startValueY = startCoords[1]

	// ### get the node directly to the right
	let nextXCoord = startValueX + 1
	let nextYCoord = startValueY
	let adjacentNode = grid[nextYCoord][nextXCoord]

	let x = 0;

	while (nodeContent != TARGET_NODE) {
		// FIXME: e.g. Uncaught TypeError: Cannot read property '2' of undefined when running algo. suspicious its
		// from the algo trying to find e.g. grid[-1][2] which obviously does not exist as there is no negative index of the grid
		// FIXME: algo will skip certain nodes that are clearly in the perimeter of the seearch area.

		if (x == 0) {
		} else {
			startCoords = nextNodes[x]
		}

		startValueX = startCoords[0]
		startValueY = startCoords[1]

		// ### get the node directly to the right

		nextXCoord = startValueX + 1
		nextYCoord = startValueY
		console.log(nextYCoord, nextXCoord);
		if (nextYCoord < 0 || nextXCoord < 0) {
			console.log(grid[nextYCoord][nextXCoord])
		}
		adjacentNode = grid[nextYCoord][nextXCoord]

		if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
			nodeContent = adjacentNode;

			if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
				visitedNodes.push([startValueX, startValueY])
			}

			if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
				nextNodes.push([nextXCoord, nextYCoord])
			}

			if (grid[startValueY][startValueX] === ".") {
				replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
			}
		}
		// ### get the node directly to the left
		nextXCoord = startValueX - 1
		nextYCoord = startValueY
		console.log(nextYCoord, nextXCoord);
		if (nextYCoord < 0 || nextXCoord < 0) {
			console.log(grid[nextYCoord][nextXCoord])
		}

		adjacentNode = grid[nextYCoord][nextXCoord]

		if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
			nodeContent = adjacentNode;

			if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
				visitedNodes.push([startValueX, startValueY])
			}

			if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
				nextNodes.push([nextXCoord, nextYCoord])
			}

			if (grid[startValueY][startValueX] === ".") {
				replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
			}
		}
		// ### get the node directly above
		nextXCoord = startValueX
		nextYCoord = startValueY + 1
		console.log(nextYCoord, nextXCoord);
		if (nextYCoord < 0 || nextXCoord < 0) {
			console.log(grid[nextYCoord][nextXCoord])
		}

		adjacentNode = grid[nextYCoord][nextXCoord]

		if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
			nodeContent = adjacentNode;

			if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
				visitedNodes.push([startValueX, startValueY])
			}

			if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
				nextNodes.push([nextXCoord, nextYCoord])
			}

			if (grid[startValueY][startValueX] === ".") {
				replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
			}
		}

		// ### get the node directly below
		nextXCoord = startValueX
		nextYCoord = startValueY - 1
		console.log(nextYCoord, nextXCoord);
		if (nextYCoord < 0 || nextXCoord < 0) {
			console.log(grid[nextYCoord][nextXCoord])
		}

		adjacentNode = grid[nextYCoord][nextXCoord]

		if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
			nodeContent = adjacentNode;

			if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
				visitedNodes.push([startValueX, startValueY])
			}

			if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
				nextNodes.push([nextXCoord, nextYCoord])
			}

			if (grid[startValueY][startValueX] === ".") {
				replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
			}
		}

		x = x + 1;
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
	rerenderGrid();
}

// todo: collapse the repetive if/if/if/if statement block with function calls or a while loop

function nodeLoop(adjacentNode, nextXCoord, nextYCoord) {
	// function so called because it "loops" over a node in the grid.

	// todo: check if nodeLoop() will push to the visitedNodes and nextNodes arrays despite scope differences...
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		nodeContent = adjacentNode;

		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}

		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
}
