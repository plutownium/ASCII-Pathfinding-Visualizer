function dijkstras(finishedGrid) {
	// step 1: confirm there is both a Start Node and a Target Node
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
	console.log(startNodeExists, targetNodeExists, startCoords);

}
