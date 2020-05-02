// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// ### startup... render the page
const mainDiv = document.getElementById("main");

const START_NODE = "*";
const EMPTY_SPACE = ".";
const WALL_SEGMENT = "#";
const BOMB_NODE = "%";
const TARGET_NODE = "X";
const VISITED_NODE = "o";
const VISITED_AFTER_BOMB = "O";
const SHORTEST_PATH_NODE = "+"

// generate a n by m grid of .'s
const grid = [];
for (let m = 0; m < 10; m++) {
	const row = [];
	for (let n = 0; n < 20; n++) {
		row.push(".");
	}
	grid.push(row);
}

const numOfColumns = grid[0].length;
const numOfRows = grid.length;
// iterate "number of columns" times, adding numOfColumns column divs which we will later populate with row divs
for (let i = 0; i < numOfColumns; i++) {
	const divToAssign = document.createElement("div");
	divToAssign.id = "column-" + i;
	mainDiv.appendChild(divToAssign);
}

// iterate over every Column div, inserting numOfRows number of Row divs
const columnDivs = mainDiv.querySelectorAll("div");
for (let j = 0; j < numOfColumns; j++) {
	const targetDiv = columnDivs[j];
	for (let k = 0; k < numOfRows; k++) {
		const divToAssign = document.createElement("div");
		divToAssign.id = "row-" + k;
		targetDiv.appendChild(divToAssign);
	}
}

// ### populate the grid of divs with ascii

for (let i = 0; i < numOfRows; i++) {
	for (let j = 0; j < numOfColumns; j++) {
		const targetDiv = getLocationByCoordinates(j, i);

		targetDiv.innerHTML = grid[i][j];
	}
}

// ### Add event listeners so user can click to add a wall segment.
resetEventListeners();

// ### Let user pick a Start point for the algorithm
const moveStartBtn = document.getElementById("moveStartBtn");
moveStartBtn.addEventListener("click", () => {
	nextClickMovesStart();
});

// ### Let user add a Target
const moveTargetBtn = document.getElementById("moveTargetBtn");
moveTargetBtn.addEventListener("click", () => {
	nextClickMovesTarget();
});

// ### Let user add a Bomb
const moveBombBtn = document.getElementById("moveBombBtn");
moveBombBtn.addEventListener("click", () => {
	nextClickMovesBomb();
});

// ### Let user remove a wall segment
const removeWallBtn = document.getElementById("removeWallBtn");
removeWallBtn.addEventListener("click", () => {
	nextClickRemovesWall();
})

// ### Let user clear the board (also should allow the user to "Run Pathfinding Algorithm" again)
const clearBoardBtn = document.getElementById("clearBoardBtn")
clearBoardBtn.addEventListener("click", () => {
	clearBoard();
})

// todo: add Dijkstra's algorithm and test it
// todo: make each space used by Dijkstra's turn into a +, one by one (one space every .3 seconds or something)
// todo: make Dijkstra's find its way to the bomb first if there is a bomb
// todo: make Dijkstra's path from the bomb to the target
// todo: visualize all the spaces "searched" by Dijkstra's. o's and O's
// todo: Add "Speed" selector
// todo: Add "Mazes & Patterns" selector & generators (how?)

// *** ********* *** ********* *** ********* *** ********* *** ********* *** ********* ***
// *** FUNCTIONS *** FUNCTIONS *** FUNCTIONS *** FUNCTIONS *** FUNCTIONS *** FUNCTIONS ***
// *** ********* *** ********* *** ********* *** ********* *** ********* *** ********* ***


function getLocationByCoordinates(x, y) {
	// NOTES: Remember the columns and rows are Zero Indexed! Cols 0 through 9 and Rows 0 through 7 in the draft version
	const getMainDiv = document.getElementById("main");
	const column = getMainDiv.children[x];
	const target = column.children[y];
	return target;
}

function replaceWithWall(x, y) {
	// NOTE: Grid coordinates are y, x not x, y like you'd expect
	if (grid[y][x] === EMPTY_SPACE) {
		grid[y][x] = WALL_SEGMENT;
	}
	rerenderGrid();
}

function rerenderGrid() {
	for (let i = 0; i < numOfRows; i++) {
		for (let j = 0; j < numOfColumns; j++) {
			const targetDiv = getLocationByCoordinates(j, i);
			targetDiv.innerHTML = grid[i][j];
		}
	}
}

function generateAnimationSequence(scansArray, pathArray) {
	const sequence = [];
	// scansArray.length - 1 because scansArray.length results in the TARGET_NODE being animated over
	for (let i = 0; i < scansArray.length - 1; i++) {
		sequence.push([scansArray[i][0], scansArray[i][1], "scan"])
	}
	// pathArray.length - 1 because scansArray.length results in the TARGET_NODE being animated over
	// i = 1 because pathArray[0] would animate over the START_NODE
	for (let i = 1; i < pathArray.length; i++) {
		sequence.push([pathArray[i][0], pathArray[i][1], "path"])
	}
	return sequence
}

function renderScansAndPathByTimer(algoPath) {
	const numOfAnimations = algoPath.length - 1; // - 1 because we don't wanna animate the TARGET_NODE at the end
	let frameNum = 0;

	// Renders the current frame and schedules the next frame
	// This repeats until we have exhausted all frames
	function renderIn() {
		if (frameNum >= numOfAnimations) {
			// end recursion
			console.log("Done!")
			return
		}
		// Immediately render the current frame
		if (algoPath[frameNum][2] === "scan") {
			const xCoordinate = algoPath[frameNum][0];
			const yCoordinate = algoPath[frameNum][1];
			frameNum = frameNum + 1;
			updateCoordinatesWithScanMarker(xCoordinate, yCoordinate)
		} else if (algoPath[frameNum][2] === "path") {
			const xCoordinate = algoPath[frameNum][0];
			const yCoordinate = algoPath[frameNum][1];
			frameNum = frameNum + 1;
			updateCoordinatesWithTrailMarker(xCoordinate, yCoordinate);
		} else {
			throw "You shouldn't be able to get here you know."
		}
		// Schedule the next frame for rendering
		setTimeout(function () {
			renderIn()
		}, 500);
	}
	// Render first frame
	renderIn()
}

// TODO: Add "generate board width by browser width"
// TODO: Add a random maze generator option...! Yikes.
// TODO: add Horizontal Skew Maze generator. YIKES
// TODO: Add a "bomb node" option... Also yikes!

// TODO: animate grid with CSS transitions (colors, KISS)
// TODO: Add a "No Route To Target Node Available!" msg when its true
// NOTE: It's more important to make it LOOK good than add lots of diff pathfinding algos (all basically the same)
// ...or lots of diff maze algos (two is enough)

function updateCoordinatesWithTrailMarker(xCoord, yCoord) {
	grid[yCoord][xCoord] = SHORTEST_PATH_NODE;
	const targetDiv = getLocationByCoordinates(xCoord, yCoord);
	targetDiv.innerHTML = grid[yCoord][xCoord];

}

function updateCoordinatesWithScanMarker(xCoord, yCoord) {
	grid[yCoord][xCoord] = VISITED_NODE;
	const targetDiv = getLocationByCoordinates(xCoord, yCoord);
	targetDiv.innerHTML = grid[yCoord][xCoord];

}

function nextClickMovesStart() {
	// function allows the user to move the Start Node around on the grid.
	// First all event listeners are removed so there isn't conflict between "add wall" and "add start node".
	// Then each spot on the grid gets an addStartNode event listener.
	// The "addStartNode" function will take care of replacing all spots on the grid with "add wall" event listeners when finished.

	const columnDivs = mainDiv.children;
	for (let x = 0; x < numOfColumns; x++) {
		// iterate through the columns, getting a list of their children
		const targetColumnRows = columnDivs[x].children;
		for (let y = 0; y < numOfRows; y++) {
			// iterate through the row divs in the columns.
			// To remove all event listeners, clone the node, and replace it with the clone.
			const oldElement = targetColumnRows[y];
			const newElement = oldElement.cloneNode(true);
			oldElement.parentNode.replaceChild(newElement, oldElement);
		}
		for (let y = 0; y < numOfRows; y++) {
			targetColumnRows[y].addEventListener("click", () => {
				addStartNode(x, y);
			});
		}
	}
	const messageBarParagraphTag = document.getElementById("messageBar").children[0]
	messageBarParagraphTag.innerHTML = "Click to add or move a Start Node"
}

function addStartNode(x, y) {
	// NOTE: Grid coordinates are y, x not x, y like you'd expect
	// Step 1: Remove old start node if it exists
	const columnDivs = mainDiv.children;
	for (let xCoord = 0; xCoord < numOfColumns; xCoord++) {
		const targetColumnRows = columnDivs[xCoord].children;
		for (let yCoord = 0; yCoord < numOfRows; yCoord++) {
			if (grid[yCoord][xCoord] === START_NODE) {
				grid[yCoord][xCoord] = EMPTY_SPACE;
			}
		}
	}
	// Step 2: Set the new Start Node
	grid[y][x] = START_NODE;
	rerenderGrid();
	resetEventListeners();
}

function nextClickMovesTarget() {
	// function allows the user to move the Target Node around on the grid.
	// First all event listeners are removed so there isn't conflict between "add wall" and "add target node".
	// Then each spot on the grid gets an addTargetNode event listener.
	// The "addTargetNode" function will take care of replacing all spots on the grid with "add wall" event listeners when finished.

	const columnDivs = mainDiv.children;
	for (let x = 0; x < numOfColumns; x++) {
		// iterate through the columns, getting a list of their children
		const targetColumnRows = columnDivs[x].children;
		for (let y = 0; y < numOfRows; y++) {
			// iterate through the row divs in the columns.
			// To remove all event listeners, clone the node, and replace it with the clone.
			const oldElement = targetColumnRows[y];
			const newElement = oldElement.cloneNode(true);
			oldElement.parentNode.replaceChild(newElement, oldElement);
		}
		for (let y = 0; y < numOfRows; y++) {
			targetColumnRows[y].addEventListener("click", () => {
				addTargetNode(x, y);
			});
		}
	}
	const messageBarParagraphTag = document.getElementById("messageBar").children[0]
	messageBarParagraphTag.innerHTML = "Click to add or move a Target Node"
}

function addTargetNode(x, y) {
	// NOTE: Grid coordinates are y, x not x, y like you'd expect
	// Step 1: Remove old Target node if it exists
	const columnDivs = mainDiv.children;
	for (let xCoord = 0; xCoord < numOfColumns; xCoord++) {
		const targetColumnRows = columnDivs[xCoord].children;
		for (let yCoord = 0; yCoord < numOfRows; yCoord++) {
			if (grid[yCoord][xCoord] === TARGET_NODE) {
				grid[yCoord][xCoord] = EMPTY_SPACE;
			}
		}
	}
	// Step 2: Set the new Target Node
	grid[y][x] = TARGET_NODE;
	rerenderGrid();
	resetEventListeners();
}

function nextClickMovesBomb() {
	// function allows the user to move the Bomb Node around on the grid.
	// First all event listeners are removed so there isn't conflict between "add wall" and "add bomb node".
	// Then each spot on the grid gets an addBombNode event listener.
	// The "addBombNode" function will take care of replacing all spots on the grid with "add wall" event listeners when finished.

	const columnDivs = mainDiv.children;
	for (let x = 0; x < numOfColumns; x++) {
		// iterate through the columns, getting a list of their children
		const targetColumnRows = columnDivs[x].children;
		for (let y = 0; y < numOfRows; y++) {
			// iterate through the row divs in the columns.
			// To remove all event listeners, clone the node, and replace it with the clone.
			const oldElement = targetColumnRows[y];
			const newElement = oldElement.cloneNode(true);
			oldElement.parentNode.replaceChild(newElement, oldElement);
		}
		for (let y = 0; y < numOfRows; y++) {
			targetColumnRows[y].addEventListener("click", () => {
				addBombNode(x, y);
			});
		}
	}
	// show the user a message...
	const messageBarParagraphTag = document.getElementById("messageBar").children[0]
	messageBarParagraphTag.innerHTML = "Click to add or move a Bomb Node"
}

function addBombNode(x, y) {
	// NOTE: Grid coordinates are y, x not x, y like you'd expect
	// Step 1: Remove old Target node if it exists
	const columnDivs = mainDiv.children;
	for (let xCoord = 0; xCoord < numOfColumns; xCoord++) {
		const targetColumnRows = columnDivs[xCoord].children;
		for (let yCoord = 0; yCoord < numOfRows; yCoord++) {
			if (grid[yCoord][xCoord] === BOMB_NODE) {
				grid[yCoord][xCoord] = EMPTY_SPACE;
			}
		}
	}
	// Step 2: Set the new Target Node
	grid[y][x] = BOMB_NODE;
	rerenderGrid();
	resetEventListeners();
}

function nextClickRemovesWall() {
	// if the grid contains no wall segments, do nothing.
	let containsWallSegment = false;
	for (let i = 0; i < grid[0].length; i++) { // use the length of row 0
		for (let j = 0; j < grid.length; j++) { // use the height of the grid
			if (grid[j][i] === WALL_SEGMENT) { // should iterate over every 
				containsWallSegment = true;
			}
		}
	}
	if (containsWallSegment) {
		// first, remove all event listeners.
		const columnDivs = mainDiv.children;
		for (let x = 0; x < numOfColumns; x++) {
			// iterate through the columns, getting a list of their children
			const targetColumnRows = columnDivs[x].children;
			for (let y = 0; y < numOfRows; y++) {
				// iterate through the row divs in the columns.
				// To remove all event listeners, clone the node, and replace it with the clone.
				const oldElement = targetColumnRows[y];
				const newElement = oldElement.cloneNode(true);
				oldElement.parentNode.replaceChild(newElement, oldElement);
			}
			// next, add event listeners to nodes that contain a WALL SEGMENT which turn WALL SEGMENTs into unvisited nodes.
			for (let y = 0; y < numOfRows; y++) {
				if (targetColumnRows[y].innerHTML === WALL_SEGMENT) {
					targetColumnRows[y].addEventListener("click", () => {
						removeWallNode(x, y);
					});
				}
			}
		}
		// show the user a message letting them know they have to click and remove an event listener to continue
		const messageBarParagraphTag = document.getElementById("messageBar").children[0]
		messageBarParagraphTag.innerHTML = "Click to remove a Wall Segment"

		return true // done
	} else {
		// show the user a message letting them know there is no wall segment to remove...
		const messageBarParagraphTag = document.getElementById("messageBar").children[0]
		messageBarParagraphTag.innerHTML = "No wall segment to remove!"

		return false // do nothing because there is no wall segment on the grid
	}
}

function removeWallNode(x, y) {
	grid[y][x] = EMPTY_SPACE;
	rerenderGrid();
	resetEventListeners();
}

function clearBoard() {
	const width = grid[0].length;
	const height = grid.length;

	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			grid[j][i] = EMPTY_SPACE;
		}
	}
	rerenderGrid();
	resetEventListeners();
}

function resetEventListeners() {
	// general purpose function used to
	// 1) remove all event listeners from grid and
	// 2) add "Replace With Wall" event listeners to each grid pos, which is the default state.

	const columnDivs = mainDiv.children;
	for (let x = 0; x < numOfColumns; x++) {
		// iterate through the columns, getting a list of their children
		const targetColumnRows = columnDivs[x].children;
		for (let y = 0; y < numOfRows; y++) {
			// iterate through the row divs in the columns.
			// To remove all event listeners, clone the node, and replace it with the clone.
			const oldElement = targetColumnRows[y];
			const newElement = oldElement.cloneNode(true);
			oldElement.parentNode.replaceChild(newElement, oldElement);
		}
		for (let y = 0; y < numOfRows; y++) {
			targetColumnRows[y].addEventListener("click", () => {
				replaceWithWall(x, y);
			});
		}
	}
}

function fixBoardInstantlyFillsOnClickBug() {
	const columnDivs = mainDiv.children;
	for (let x = 0; x < numOfColumns; x++) {
		// iterate through the columns, getting a list of their children
		const targetColumnRows = columnDivs[x].children;
		for (let y = 0; y < numOfRows; y++) {
			// iterate through the row divs in the columns.
			// To remove all event listeners, clone the node, and replace it with the clone.
			const oldElement = targetColumnRows[y];
			const newElement = oldElement.cloneNode(true);
			oldElement.parentNode.replaceChild(newElement, oldElement);
		}
	}
}

// a button for printing the grid's current first 4 values
const testButton = document.getElementById("printGrid");
testButton.addEventListener("click", () => {
	for (i = 0; i < 4; i++) {
		console.log(grid[i]);
	}
});

const inspect = document.getElementById("inspect");
inspect.addEventListener("click", () => {
	const shortestPathAndScanningOrder = dijkstras(grid);
	if (shortestPathAndScanningOrder === false) {
		throw "ERROR: No path from START_NODE to TARGET_NODE. Remove a Wall Segment and try again!"
	}
	fixBoardInstantlyFillsOnClickBug();
	const scansAndPath = generateAnimationSequence(shortestPathAndScanningOrder[1], shortestPathAndScanningOrder[0].path)
	renderScansAndPathByTimer(scansAndPath)
	resetEventListeners();
});

// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
