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

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
	// ### get the node directly to the left
	nextXCoord = startValueX - 1
	nextYCoord = startValueY
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {

			visitedNodes.push([startValueX, startValueY])
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
	// ### get the node directly above
	nextXCoord = startValueX
	nextYCoord = startValueY + 1
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
	// ### get the node directly below
	nextXCoord = startValueX
	nextYCoord = startValueY - 1
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}


		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}

	console.log("origin:" + startCoords);

	// ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### 
	// ### Cycle complete. Next step is to REPEAT the cycle with a new startCoords, found from the nextNodes array.
	startCoords = nextNodes[0]

	startValueX = startCoords[0]
	startValueY = startCoords[1]

	// ### get the node directly to the right
	nextXCoord = startValueX + 1
	nextYCoord = startValueY
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there

		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			console.log("pushing...")
			visitedNodes.push([startValueX, startValueY])
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
	// ### get the node directly to the left
	nextXCoord = startValueX - 1
	nextYCoord = startValueY
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
	// ### get the node directly above
	nextXCoord = startValueX
	nextYCoord = startValueY + 1
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
	// ### get the node directly below
	nextXCoord = startValueX
	nextYCoord = startValueY - 1
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}


		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}

	console.log("New home node:" + startCoords)
	console.log("nextNodes:")
	console.log(nextNodes);

	// ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### 
	// ### Cycle complete. 
	startCoords = nextNodes[1]

	startValueX = startCoords[0]
	startValueY = startCoords[1]

	// ### get the node directly to the right
	nextXCoord = startValueX + 1
	nextYCoord = startValueY
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
	// ### get the node directly to the left
	nextXCoord = startValueX - 1
	nextYCoord = startValueY
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
	// ### get the node directly above
	nextXCoord = startValueX
	nextYCoord = startValueY + 1
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
	// ### get the node directly below
	nextXCoord = startValueX
	nextYCoord = startValueY - 1
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}


		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}

	console.log("New home node:" + startCoords)
	console.log("nextNodes:");
	console.log(nextNodes)

	// ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### 
	// ### Cycle complete. 
	startCoords = nextNodes[2]

	startValueX = startCoords[0]
	startValueY = startCoords[1]
	console.log("New home node:" + startCoords)

	// ### get the node directly to the right
	nextXCoord = startValueX + 1
	nextYCoord = startValueY
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
	// ### get the node directly to the left
	nextXCoord = startValueX - 1
	nextYCoord = startValueY
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
	if (adjacentNode != WALL_SEGMENT && !isArrayInArray(visitedNodes, [nextXCoord, nextYCoord])) {
		// assign nodeContent the value of adjacentNode so the while loop can check its condition...
		nodeContent = adjacentNode;

		// calculate how far it is to this node from the origin
		// ??? what to do for that???

		// push the node we're starting our search from to the list of visitedNodes if it isn't already there
		if (!isArrayInArray(visitedNodes, [startValueX, startValueY])) {
			visitedNodes.push([startValueX, startValueY])
		}

		// push the node onto the list of nodes to cycle into this process (unless it's already there)
		if (!isArrayInArray(nextNodes, [nextXCoord, nextYCoord])) {
			nextNodes.push([nextXCoord, nextYCoord])
		}

		// finally, replace the node's visual appearance: convert . to o
		if (grid[startValueY][startValueX] === ".") {
			replaceEmptySpaceWithVisitedMarker(startValueX, startValueY);
		}
	}
	// ### get the node directly above
	nextXCoord = startValueX
	nextYCoord = startValueY + 1
	adjacentNode = grid[nextYCoord][nextXCoord]

	// "if the adjacent node is neither a wall segment nor already contained in the visitedNodes array..."
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

	console.log("nextNodes:");
	console.log(nextNodes)

	// while (nodeContent != TARGET_NODE) {

	// }

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