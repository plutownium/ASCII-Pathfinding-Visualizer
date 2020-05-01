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

// todo: add Dijkstra's algorithm and test it
// todo: make each space used by Dijkstra's turn into a +, one by one (one space every .3 seconds or something)
// todo: make Dijkstra's find its way to the bomb first if there is a bomb
// todo: make Dijkstra's path from the bomb to the target
// todo: visualize all the spaces "searched" by Dijkstra's. o's and O's
// todo: Add 3-4 other algorithms
// todo: Add "Clear Board" button
// todo: Add "Clear walls & weights" button
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

function promisesRendering(animationDelay, algoPath) {
	// receives a delay timer and an array which is the trail from START_NODE to TARGET_NODE
	const numOfAnimations = algoPath.length;

	// i starts at 1 because we don't wanna animate the START_NODE into a + symbol, nor the TARGET_NODE
	for (let i = 1; i < numOfAnimations - 1; i++) {
		const xCoordinate = algoPath[i][0];
		const yCoordinate = algoPath[i][1];
		setTimeout(i * animationDelay, updateCoordinatesWithTrailMarker(xCoordinate, yCoordinate))
		// FIXME: updateCoordsWTrailMarker should rerender a specific node, not the whole grid.
	}
}

function sleep(milliseconds) {
	// Step 1. Pick out which node is going to be animated.
	// Step 2. Generate a promise delayed by n ms set to update the visual appearance of the node when the promise resolves
	// step 3. repeat this for each node in the list of nodes to be animated.
	return new Promise(resolve => setTimeout())
}

// FIXME: this option for adding a delay to the animation didn't work, what else can be done?
// TODO: Add a "REMOVE WALL SEGMENT" button
// TODO: Add "generate board width by browser width"
// TODO: Add a random maze generator option...! Yikes.
// TODO: add Horizontal Skew Maze generator. YIKES
// TODO: Add a "bomb node" option... Also yikes!
// TODO: pass NodeList to renderByTimer()
// TODO: animate grid with CSS transitions (colors, KISS)
// TODO: Add a "No Route To Target Node Available!" msg when its true
// NOTE: It's more important to make it LOOK good than add lots of diff pathfinding algos (all basically the same)
// ...or lots of diff maze algos (two is enough)

function updateCoordinatesWithTrailMarker(xCoord, yCoord) {
	grid[yCoord][xCoord] = SHORTEST_PATH_NODE;
	const targetDiv = getLocationByCoordinates(xCoord, yCoord);
	targetDiv.innerHTML = grid[yCoord][xCoord];

}

function renderByTimer(animationDelay, algoPath, scanTargets) {
	// receives a delay timer and an array which is the trail from START_NODE to TARGET_NODE
	const numOfAnimations = algoPath.length;

	// i starts at 1 because we don't wanna animate the START_NODE into a + symbol, nor the TARGET_NODE
	for (let i = 1; i < numOfAnimations - 1; i++) {
		const xCoordinate = algoPath[i][0];
		const yCoordinate = algoPath[i][1];
		setTimeout(i * animationDelay, updateCoordinatesWithTrailMarker(xCoordinate, yCoordinate))
	}
}

function rerenderGridSlowly(renderMe) {
	// PLAN: renderMe is the sole input. It is the Grid as it is after the algorithm searches & decides on a path.
	// Function operates by starting w/ the time of datetime.now(). 
	// Then, a while loop updates the current time.
	// Every time the current time increases by n milliseconds, the function goes another step forward in rendering changes.
	// the while loop breaks once the last node in the grid has been updated.

	let startTime = Date.now();
	// set interval duration...
	const interval = 200;

	let currentTime;
	let lastUpdateTime;

	// build a list of coords to be updated...
	const coordsToUpdate = [];
	for (let i = 0; i < numOfRows; i++) {
		for (let j = 0; j < numOfColumns; j++) {
			coordsToUpdate.push[[i, j]]
		}
	}
	let xCoord;
	let yCoord;
	// figure out how many times this while loop has to loop...
	const finalIndex = coordsToUpdate.length - 1;
	let iteration = 0;

	// update currentTime over and over, executing code every n milliseconds...
	while (iteration < finalIndex) {
		currentTime = Date.now();
		if (currentTime - startTime > interval) {
			// update a node on the grid...
			xCoord = coordsToUpdate[iteration][0];
			yCoord = coordsToUpdate[iteration][1];
			const targetDiv = getLocationByCoordinates(xCoord, yCoord)
			targetDiv.innerHTML = renderMe[yCoord, xCoord]
			// reset the timer & update the iteration position...
			startTime = Date.now();
			iteration = iteration + 1;
		}
	}
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
	renderByTimer(1000, shortestPathAndScanningOrder[0].path, shortestPathAndScanningOrder[1])
});

// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
