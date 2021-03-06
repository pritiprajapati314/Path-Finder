let size = 1;
let row = 23;
let column = 55;
let array = Array(row).fill().map(() => Array(column).fill(0));

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
    let start = (1).toString() + " " + (1).toString(); 
    let end = (19).toString() + " " + (23).toString();
    //array[1][1] = 2;
    //array[19][23] = 3;
    document.getElementById(start).style.backgroundColor = "green";
    document.getElementById(end).style.backgroundColor = "red";
    depthfirstSearch(1, 1, 19, 23);
    makeWalls(0, 54, 0, 22);
}

function createWallsRow(x, start, end){
    for(let i = start; i<end; i++){
        let temp1 = i.toString() + " " + (x).toString();
        array[i][x] = 1;
        document.getElementById(temp1).style.backgroundColor = "black";
    }
}
function createWallsColumn(x, start, end){
    for(let i = start; i<end; i++){
        let temp1 = (x).toString() + " " + (i).toString();
        array[x][i] = 1;
        document.getElementById(temp1).style.backgroundColor = "black";
    }
}

function depthfirstSearch(startR, startC, endR, endC){
    if(startR == endR && startC == endC){
        console.log("hello");
        return true;
    }
    array[startR][startC] = 1;
    if(startR-1 > 0 && array[startR-1][startC] == 0){
        let temp = (startR-1).toString() + " " + (startC).toString();
        document.getElementById(temp).style.backgroundColor = "blue";
        if(depthfirstSearch(startR-1, startC, endR, endC) == true){
            document.getElementById(temp).style.backgroundColor = "yellow";
            return true;
        }
    }
    if(startR+1 < 23 && array[startR+1][startC] == 0){
        let temp = (startR+1).toString() + " " + (startC).toString();
        document.getElementById(temp).style.backgroundColor = "blue";
        if(depthfirstSearch(startR+1, startC, endR, endC) == true){
            document.getElementById(temp).style.backgroundColor = "yellow";
            return true;
        }
    }
    if(startC-1 > 0 && array[startR][startC-1] == 0){
        let temp = (startR).toString() + " " + (startC-1).toString();
        document.getElementById(temp).style.backgroundColor = "blue";
        if(depthfirstSearch(startR, startC-1, endR, endC) == true){
            document.getElementById(temp).style.backgroundColor = "yellow";
            return true;
        }
    }
    if(startC+1 < 55 && array[startR][startC+1] == 0){
        let temp = (startR).toString() + " " + (startC+1).toString();
        document.getElementById(temp).style.backgroundColor = "blue";
        if(depthfirstSearch(startR, startC+1, endR, endC) == true){
            document.getElementById(temp).style.backgroundColor = "yellow";
            return true;
        }
    }
    return false;
}
function makeWalls(minR, maxR, minC, maxC){
    let divR = Math.floor(Math.random() * (maxR - minR) + minR);
    let divC = Math.floor(Math.random() * (maxC - minC) + minC);
    
}





