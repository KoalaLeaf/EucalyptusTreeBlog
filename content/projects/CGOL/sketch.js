let sWidth = 800;
let sHeight = 800;

let cells = [0];
let ncells = [0];
let xsize;
let ysize;
let rows = 60;
let cols = 60;

let fr = 30;

function setup() {
  let cnv = createCanvas(sWidth, sHeight);
  cnv.id('myCanvas');
  cnv.parent('projectWindow');

  frameRate(fr);
  xsize = sWidth / rows;
  ysize = sHeight / cols;

  for (let i = 0; i < rows * cols; i++) {
    append(cells, random([0, 1]));
    append(ncells, 0);
  }
}

function draw() {
  frameRate(fr);
  console.log(fr);
  
  background(255);
  drawGrid();

  drawCells();

  updateCells();
  nextGeneration();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    fr--;
  } else if (keyCode === UP_ARROW) {
    fr++;
  }
  // Uncomment to prevent any default behavior.
  // return false;
}

function nextGeneration() {
  cells = ncells.slice(); // Create a copy of ncells
  ncells.fill(0); // Reset ncells
}

function updateCells() {
  for (let i = 0; i < cells.length; i++) {
    let n = neighbors(i);

    if (cells[i] == 1) {
      if (n < 2) {
        ncells[i] = 0;
      } else if (n == 2 || n == 3) {
        ncells[i] = 1;
      } else if (n > 3) {
        ncells[i] = 0;
      }
    } else {
      if (n == 3) {
        ncells[i] = 1;
      }
    }
  }
}

function neighbors(index) {
  let n = 0;
  const offsets = [
    [-1, 0], // Top Middle
    [-1, 1], // Top Right
    [-1, -1], // Top Left
    [0, 1], // Middle Right
    [0, -1], // Middle Left
    [1, 0], // Bottom Middle
    [1, 1], // Bottom Right
    [1, -1], // Bottom Left
  ];

  for (const offset of offsets) {
    const neighborIndex = index + offset[0] * rows + offset[1];
    if (isValidIndex(neighborIndex, rows, cols) && cells[neighborIndex] === 1) {
      n++;
    }
  }

  return n;
}

function isValidIndex(index, rows, cols) {
  return index >= 0 && index < rows * cols;
}

function posFromIndex(index) {
  let y = int(index / cols) * ysize;
  let x = (index % rows) * xsize;

  let r = createVector(x, y);
  return r;
}

function drawCells() {
  fill(0, 0, 0);
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] == 1) {
      pos = posFromIndex(i);
      square(pos.x, pos.y, (xsize + ysize) / 2);
    }
  }
}

function drawGrid() {
  noFill();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      square(i * xsize, j * ysize, (xsize + ysize) / 2);
    }
  }
}
