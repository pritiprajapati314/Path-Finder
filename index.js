let size = 1;
let row = 23;
let column = 55;
//let array = Array(row).fill().map(() => Array(column).fill(0)); for 2d array
let array = Array.apply(null, Array(row*column)).map(Number.prototype.valueOf,0);
let neighbours = [];

function neighbour(index){
    let r = Math.floor((index)/column);
    let c = Math.floor((index)%column);
    let tempArr = [];
    if(c < column-1)tempArr.push(index+1);
    if(c > 0)tempArr.push(index-1);
    if(r < row-1)tempArr.push(index+column);
    if(r > 0)tempArr.push(index-column);
    neighbours.push(tempArr);
}

function maze(){
    let maze = document.getElementById("maze");
    let name = 0;
    for(let i = 0; i<row; i++){
        let newRow = document.createElement("tr");
        for(let j = 0; j<column; j++){
            let newColumn = document.createElement("td");
            let temp = name.toString();
            neighbour(name);
            name = name + 1;
            newColumn.id = temp;
            newColumn.style.width = "24px";
            newRow.appendChild(newColumn);
        }
        newRow.style.height = "24px";
        maze.appendChild(newRow);
    }
    let start = 0;
    let end = 1264;
    document.getElementById(start).style.backgroundColor = "green";
    document.getElementById(end).style.backgroundColor = "red";
    depthfirstSearch(start, end);  
}

function depthfirstSearch(start, end){
    if(start == end)return true;
    array[start] = 1;
    let size = neighbours[start].length;
    for(let i = 0; i<size; i++){
        let temp = neighbours[start][i];
        if(array[temp] == 0 && depthfirstSearch(temp, end) == true){
            if(temp != end)
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





