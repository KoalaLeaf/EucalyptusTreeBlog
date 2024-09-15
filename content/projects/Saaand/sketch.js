let elementIndex = 0;
let elements = ['Air','Sand', 'Water', 'Wood','Fire','Smoke', 'Non Flammable Wood']

let isPaused = false; // State to check if simulation is paused

let brushsize = 50;

function setup() {
    let cnv = createCanvas(800, 800);
    cnv.id('myCanvas');
    cnv.parent('projectWindow');
    noStroke()
    grid = new Grid(200,200)
    

}

function mouseWheel(event) {
  if (event.delta > 0) {
    if(elementIndex < elements.length - 1){
      elementIndex ++;
    }
  } else {
     if(elementIndex > 0){
        elementIndex --;
    }
  }
}

function keyPressed() {
  if (key === ' ') { // Spacebar key
    isPaused = !isPaused; // Toggle pause state

  }
  if(key == 'w'){
    brushsize += 10;
  }
  if(key == 's'){
    brushsize -= 10;
  }
}

function draw() {
  background(255);
 
  
  
  if(mouseIsPressed){
    grid.addCellsInCircle(elementIndex, createVector(mouseX, mouseY), brushsize);
  }
  
      if (isPaused) {
 
    } else {
        grid.updateGrid(); 
    }
  

  grid.showGrid();
  Hud(); 
  
  push();
  stroke(50)
  noFill();
  circle(mouseX, mouseY,brushsize * 1.75);
  pop();
}


function Hud(){
    text(int(frameRate()), 25, 50)
    text(elements[elementIndex],width/2 - 50, 50, 150)
}