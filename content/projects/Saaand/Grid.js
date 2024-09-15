class Grid{
  constructor(cols, rows){
     
    this.woodFlamibility = .2
    
    this.rows = rows;
    this.cols = cols;
    this.xsize = width/this.cols;
    this.ysize = height/this.rows;
    
    this.grid = new Array(this.cols * this.rows)
    this.grid.fill(0)
  }
  
addCellsInCircle(type, centerPos, radius) {
  let centerIndex = this.indexFromPos(centerPos);
  let centerX = centerPos.x;
  let centerY = centerPos.y;

  // Determine the bounds for the area to check
  let minX = centerX - radius;
  let maxX = centerX + radius;
  let minY = centerY - radius;
  let maxY = centerY + radius;

  // Loop through all cells within the bounding box of the circle
  for (let x = minX; x <= maxX; x += this.xsize) {
    for (let y = minY; y <= maxY; y += this.ysize) {
      // Check if the cell center is within the circle
      let dx = x - centerX;
      let dy = y - centerY;
      if (dx * dx + dy * dy <= radius * radius) {
        let cellPos = { x: x, y: y };
        let index = this.indexFromPos(cellPos);
        
        // Ensure the index is within bounds
        if (index >= 0 && index < this.grid.length) {
          this.grid[index] = type;
        }
      }
    }
  }
}

  
  setCell(ci, type){
    this.grid[ci] = type;
  }
  
  deleteCell(ci){
    this.grid[ci] = 0;
  }
  moveCell(ci,di){
    
    if(this.isValidIndex(di)){
      let tmp = this.grid[ci]
      this.grid[di] = tmp;
      this.grid[ci] = 0;
    }
  }
  
  swapCells(i1, i2){
    let tmp1 = this.grid[i1]
    let tmp2 = this.grid[i2]
    
    this.grid[i1] = tmp2
    this.grid[i2] = tmp1
  }
  
  updateGrid(){
    for(let i = this.grid.length; i > 0; i--) //Loop through backwards to avoid multiple updates to a particle per 'frame'
      {
      let randomNum = random(0, 2);
      let offset = randomNum < 1 ? -1 : 1;
        
      if(this.grid[i] == 1){ //sand
        
         if(this.grid[i + this.rows] == 0){
           this.moveCell(i, i + this.rows)
         }else if(this.grid[i + this.rows - 1] == 0 && offset == -1){
           this.moveCell(i, i + this.rows - 1)
         }else if(this.grid[i + this.rows + 1] == 0 && offset == 1){
           this.moveCell(i, i + this.rows + 1)
         }else if(this.grid[i + this.rows] == 2 && random(0,1) > .5){
           this.swapCells(i, i + this.rows);
         }
      }else if(this.grid[i] == 2 ){ //Water
         if(this.grid[i + this.rows] == 0){
           this.moveCell(i, i + this.rows)
         }else if(this.grid[i + this.rows - 1] == 0 && offset == -1){
           this.moveCell(i, i + this.rows - 1)
         }else if(this.grid[i + this.rows + 1] == 0 && offset == 1){
           this.moveCell(i, i + this.rows + 1)
         }else if(this.grid[i - 1] == 0 && offset == -1){
           this.moveCell(i, i - 1)
         }else if(this.grid[i + 1] == 0 && offset == 1 && random(0,1) > .8){
           this.moveCell(i, i + 1)
         }     
      }else if(this.grid[i] == 3){
        
      }else if(this.grid[i] == 4){ //Fire
          let tick = random(0,1);
          let fuel = .02
          if(this.grid[i + 1] == 3 && tick < this.woodFlamibility) {
            fuel -= .025
            this.setCell(i + 1, 4)
          }else if(this.grid[i - 1] == 3 && tick <  this.woodFlamibility) {
            fuel -= .025
            this.setCell(i - 1, 4)
          }else if(this.grid[i + this.rows] == 3 && tick <  this.woodFlamibility) {
            fuel -= .025
            this.setCell(i + this.rows, 4)
          }else if(this.grid[i - this.rows] == 3 && tick <  this.woodFlamibility) {
            fuel -= .025
            this.setCell(i - this.rows, 4)
          }else if(this.grid[i + 1 + this.rows] == 3 && tick <  this.woodFlamibility) {
            fuel -= .025
            this.setCell(i + 1 + this.rows, 4)
          }else if(this.grid[i + 1 - this.rows] == 3 && tick <  this.woodFlamibility) {
            fuel -= .025
            this.setCell(i + 1 - this.rows, 4)
          }else if(this.grid[i - 1 + this.rows] == 3 && tick <  this.woodFlamibility) {
            fuel -= .025
            this.setCell(i - 1 + this.rows, 4)
          }else if(this.grid[i - 1 - this.rows] == 3 && tick <  this.woodFlamibility) {
            fuel -= .025
            this.setCell(i - 1 - this.rows, 4)
          }else{
            let tick = random(0,1);
            if(tick < fuel){
              this.deleteCell(i)
              if(tick < .01){
               this.setCell(i,5);
              }
              //swap with smoke when implemented 
            }else {
              if(this.grid[i - this.rows] == 0 && tick > .7){
                this.moveCell(i, i - this.rows)
              } else if(this.grid[i - this.rows + 1] == 0 && tick > .7) {
                this.moveCell(i, i - this.rows + 1)
              } else if(this.grid[i - this.rows - 1] == 0 && tick > .7){
                this.moveCell(i, i - this.rows - 1)
              }
              
            }
          }
      }else if(this.grid[i] == 5){
            let tick = random(0,1);
            if(tick < .005){
              this.deleteCell(i)
            }else {
              if(this.grid[i - this.rows] == 0 && tick > .7){
                this.moveCell(i, i - this.rows)
              } else if(this.grid[i - this.rows + 1] == 0 && tick > .7) {
                this.moveCell(i, i - this.rows + 1)
              } else if(this.grid[i - this.rows - 1] == 0 && tick > .7){
                this.moveCell(i, i - this.rows - 1)
              }
      }
      }else if(this.grid[i] == 6)
        {
          
        }
    }
  }
  
  
  showGrid(){
      for (let i = 0; i < this.grid.length; i++) {
        if (this.grid[i] == 1) { //Sand
            let pos = this.posFromIndex(i);
            push();
            fill(180,180,0)
            square(pos.x, pos.y, (this.xsize + this.ysize) / 2);
            pop();
        }else if(this.grid[i] == 2){ //Water
            let pos = this.posFromIndex(i);
            push();
            fill(0,0,200)
            square(pos.x, pos.y, (this.xsize + this.ysize) / 2);
            pop();
        }else if(this.grid[i] == 3){
            let pos = this.posFromIndex(i);
            push();
            fill(100,100,0)
            square(pos.x, pos.y, (this.xsize + this.ysize) / 2);
            pop();
        }else if(this.grid[i] == 4){
            let pos = this.posFromIndex(i);
            push();
            fill(random(225,255),random(100,150),0)
            square(pos.x, pos.y, (this.xsize + this.ysize) / 2);
            pop();          
        }else if(this.grid[i] == 5){
            let pos = this.posFromIndex(i);
            push();
        fill(random(50,100))
            square(pos.x, pos.y, (this.xsize + this.ysize) / 2);
            pop();          
        }else if(this.grid[i] == 6){
           let pos = this.posFromIndex(i);
            push();
        fill(100,100,0)
            square(pos.x, pos.y, (this.xsize + this.ysize) / 2);
            pop();    
        }
        
      }
  }
  
  posFromIndex(index) {
  let y = int(index / this.cols) * this.ysize;
  let x = (index % this.rows) * this.xsize;

  let r = createVector(x, y);
  return r;
}
  indexFromPos(pos) {
  let x = pos.x;
  let y = pos.y;

  let col = int(x / this.xsize);
  let row = int(y / this.ysize);

  let index = row * this.cols + col;
  return index;
}
  
  isValidIndex(index){
    return (typeof this.grid[index] !== 'undefined')
  }
}