let size = 1;
let row = 23;
let column = 55;
let array = Array(rows).fill().map(() => Array(columns).fill(0));

function maze(){
    let maze = document.getElementById("maze");
    for(let i = 0; i<row; i++){
        let newRow = document.createElement("tr");
        for(let j = 0; j<column; j++){
            let newColumn = document.createElement("td");
            let temp = i.toString() + " " + j.toString();
            newColumn.id = temp;
            newColumn.style.width = "24px";
            newRow.appendChild(newColumn);
        }
        newRow.style.height = "24px";
        maze.appendChild(newRow);
    }
    createWallsRow(0, 0, row);
    createWallsRow(54, 0, row);
    createWallsColumn(0, 0, column);
    createWallsColumn(22, 0, column);
    makeWalls(0, 54, 0, 22);
}

function createWallsRow(x, start, end){
    for(let i = start; i<end; i++){
        let temp1 = i.toString() + " " + (x).toString();
        array[i][j] = 1;
        document.getElementById(temp1).style.backgroundColor = "black";
    }
}
function createWallsColumn(x, start, end){
    for(let i = start; i<end; i++){
        let temp1 = (x).toString() + " " + (i).toString();
        array[i][j] = 1;
        document.getElementById(temp1).style.backgroundColor = "black";
    }
}

function makeWalls(minR, maxR, minC, maxR){
    let divR = Math.floor(Math.random() * (maxR - minR) + minR);
    let divC = Math.floor(Math.random() * (maxC - minC) + minC);
    
}





