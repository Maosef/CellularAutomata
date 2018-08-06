//Conway's Game of Life

let grid;
let res = 20; //grid resolution
let refreshRate;
let slider; //variable speed
let backgroundColor = 255;
let cellColor = 0;

function makeGrid(r, c){ //initialize 2D array
    let arr = new Array(r);
    for (let i = 0; i < arr.length; i++){
        arr[i] = new Array(c);
    }
    return arr;
}

function updateGrid(grid){
    let newGrid = makeGrid(rows, cols);

    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++) {

            //rules
            let neighbors = count(i, j, grid);
            if (neighbors < 2 || neighbors > 3) newGrid[i][j] = 0;
            else if (neighbors == 3 && !grid[i][j]) newGrid[i][j] = 1;
            else newGrid[i][j] = grid[i][j];
            
        }
    }

    return newGrid;
}

function count(r, c, grid){ //count sum of neighbors
    let sum = 0;
    for (let i = -1; i<2; i++){
        for (let j = -1; j<2; j++){
            let row = (r + i + rows) % rows; //wraparound
            let col = (c + j + cols) % cols;

            sum += grid[row][col];
        }
    }
    sum -= grid[r][c]; //subtract itself
    return sum
}


function setup(){
    createCanvas(600, 400);
    slider = createSlider(1, 50, 5);

    rows = height/res;
    cols = width/res;

    grid = makeGrid(rows, cols);
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function draw(){
    background(backgroundColor);
    refreshRate = slider.value();

    //draw grid
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j]) {
                x = j*res; //because notation 
                y = i*res;
                fill(cellColor);
                rect(x, y, res, res);
            }
        }
    }

    //update grid
    if (frameCount % refreshRate == 0) 
        grid = updateGrid(grid);    

}

function mousePressed(){

}