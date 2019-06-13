let gridWidth = 8;
let gridHeight = 6;

// Check neigbors of current cell
calculateNeighbors = (x, y) => {
  let neighbors = 0;
  const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  for (let i = 0; i < directions.length; i++) {
      const dir = directions[i];
      let checkY = y + dir[0];
      let checkX = x + dir[1];

      // Checks if any cells are active in any direction of the current cell
      if (checkX >= 0 && checkX < gridWidth && checkY >= 0 && checkY < gridHeight) {
        var index = checkX + (checkY * gridWidth);
        neighbors += grid[index] ? 1 : 0;
      }
  }

  return neighbors;
}

// Create a random grid of selected cells
createGrid = () => {
  return checkboxes.map((checkbox) => {
    return Math.random() < 0.5;
  });
};

// Initial creation of board
createBoard = (width, height) => {
  let cellArray = [];
  const size = width * height;

  let cell = document.createDocumentFragment();
  for (let i = 0; i < size; i += 1) {

    let id = "box" + i;

    // If width is met, add break for new row
    if (i % width === 0) {
      let br = document.createElement("br");
      cell.appendChild(br);
    }

    // Creates a checkbox input to assign to cell
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.id = id;
    cellArray.push(checkbox);

    // Assigns label to cell by id
    let cellLabel = document.createElement("label");
    cellLabel.setAttribute("for", id);

    // Appends label and checkbox to cell
    cell.appendChild(checkbox);
    cell.appendChild(cellLabel);
  }

  // Appends each cell to grid
  board.appendChild(cell);
  return cellArray;
};

// Refreshes board state, called after each iteration
refreshBoard = () => {
  checkboxes.forEach((checkbox, index) => {
    // Changes cell to the matching grid index outlined in the iteration
    checkbox.checked = grid[index];
  });
}

// Starts running through the advance function until the stop button is clicked
iterate = () => {
  advance();
  if (!stop) {
    setTimeout(iterate, speed);
  }
}

// Running the game
let size = gridWidth * gridHeight;
runIteration = () => {
  let newBoard = new Array(size);
  for (var i = 0; i < size; i++) {
    // Find how many neighbors cell has depending on the x/y coordinate
    let x = i % gridWidth;
    let y = (i - x) / gridWidth;
    let neighbors = calculateNeighbors(x, y);

    // Set cell state depending on how many neighbors the cell has
    if (neighbors < 2 || neighbors > 3) {
      newBoard[i] = false;
    } 
    else if (neighbors === 2 ) {
      newBoard[i] =  grid[i];
    } 
    else {
      newBoard[i] = true;
    }
  }

  return newBoard;
}

// Iterates the next step in the grid one time, then refreshes board state
advance = () => {
  grid = runIteration();
  refreshBoard();
}

// Initialize the board, then start iterating
const speed = 100;
let stop = false;
let board = $("board");
let checkboxes = createBoard(gridWidth, gridHeight);
let grid = createGrid();
refreshBoard();
iterate();

// Adds Event listener to the advance button, which calls the next iteration
$("advanceBoard").addEventListener("click", advance);

// Adds Event listener to clear button
$("clearBoard").addEventListener("click", () => {

  // Iterate through each cell and set them to false
  grid = grid.map(() => {
    return false;
  });

  // Refresh board state, stop rendering, set Stop button to Play
  refreshBoard();
  stop = true;
  $("run").textContent = "Play";
})

// Adds Event listener to New Board button
$("newBoard").addEventListener("click", () => {

  // Creates new grid with empty cells then refreshes board state
  grid = createGrid();
  refreshBoard();
});

// Add Event Listener to play button
$("run").addEventListener("click", () => {

  // Checks if game is currently running, if not, start running, else, stop
  if (stop) {
    $("run").textContent = "Stop";
    stop = false;
    iterate();
    return;
  }
  $("run").textContent = "Play";
  stop = true;
});

// Allow user to create a new board size
$("setBoardSize").addEventListener("click", () => {
  let newHeight = document.getElementById("setGridHeight").value;
  let newWidth = document.getElementById("setGridWidth").value;

  // Validate user input
  if (newHeight > 0 && newWidth > 0) {
    gridHeight = newHeight;
    gridWidth = newWidth;

    // Clear board html, and append new board with new height and width
    $("board").innerHTML = "";
    $("run").textContent = "Play";
    stop = true;
    size = gridWidth * gridHeight;
    checkboxes = createBoard(gridWidth, gridHeight);
    grid = createGrid();
    refreshBoard();
    iterate();
  }
  else {
    alert("Please set the width and height of board to be > 0");
  }
});

// On board click, add cell
board.addEventListener("click", (event) => {
  const cell = event.target;

  if (cell.tagName === "LABEL") {
    // Gets cell by index (id), then sets it to either true or false
    const index = parseInt(cell.htmlFor.substring(3), 10);
    grid[index] = !grid[index];
  }
});

// A "light-weight jQuery" fucntion
function $(id) {
  return document.getElementById(id);
}