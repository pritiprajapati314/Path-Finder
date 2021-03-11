let size = 1;
let row = 23;
let column = 55;
let timeSpeed = 1;
let array = Array.apply(null, Array(row*column)).map(Number.prototype.valueOf,0);
let neighbours = [];

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function neighbour(index){
    let r = Math.floor((index)/column);
    let c = Math.floor((index)%column);
    let tempArr = [];
    if(c < column-1)tempArr.push(index+1);          //left 
    if(c > 0)tempArr.push(index-1);                 //right
    if(r < row-1)tempArr.push(index+column);        //up
    if(r > 0)tempArr.push(index-column);            //down
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
            name = name +1;
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
    //depthfirstSearch(start, end); 
    //breadthFirstSearch(start, end); 
    dijkstra(start,end);
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


function breadthFirstSearch(start, end){
    let queue = [];
    let index = 0;
    queue.push(start);
    array[start] = 1;
    let prev = Array.apply(null, Array(row*column)).map(Number.prototype.valueOf,-1);
    prev[start] = -1;
    while(true){
        let temp = queue[index];
        if(temp == end)break;
        index++;
        for(let i = 0; i<neighbours[temp].length; i++){
            if(array[neighbours[temp][i]] == 0){
                queue.push(neighbours[temp][i]);
                array[neighbours[temp][i]] = 1;
                prev[neighbours[temp][i]] = temp;
            }
        }
    }
    let temp = prev[end];
    let path = [];
    while(temp != start){
        path.push(prev[temp]);
        document.getElementById(temp).style.backgroundColor = "blue";
        temp = prev[temp];
    }
}


function breadthFirstSearch(start, end){
    let queue = [];
    let index = 0;
    queue.push(start);
    array[start] = 1;
    let matrix = Array(rows).fill().map(() => Array(columns).fill(Infinity));
    let prev = Array.apply(null, Array(row*column)).map(Number.prototype.valueOf,-1);


    prev[start] = -1;
    while(true){
        let temp = queue[index];
        if(temp == end)break;
        index++;
        for(let i = 0; i<neighbours[temp].length; i++){
            if(array[neighbours[temp][i]] == 0){
                queue.push(neighbours[temp][i]);
                array[neighbours[temp][i]] = 1;
                prev[neighbours[temp][i]] = temp;
            }
        }
    }
    let temp = prev[end];
    let path = [];
    while(temp != start){
        path.push(prev[temp]);
        document.getElementById(temp).style.backgroundColor = "blue";
        temp = prev[temp];
    }
    path.reverse();
}

function dijkstra(start, end){
    let queue = [];
    let index = 0;
    queue.push(start);
    array[start] = 1;
    let prev = Array.apply(null, Array(row*column)).map(Number.prototype.valueOf,-1);
    distanceFromSource = Array.apply(null, Array(row*column)).map(Number.prototype.valueOf,Infinity);
    prev[start] = -1;
    distanceFromSource[start] = 0;
    while(true){
        let temp = queue[index];
        if(temp == end)break;
        index++;
        for(let i = 0; i<neighbours[temp].length; i++){
            if(array[neighbours[temp][i]] == 0){
                queue.push(neighbours[temp][i]);
                array[neighbours[temp][i]] = 1;
                prev[neighbours[temp][i]] = temp;
                //distanceFromSource[neighbours[temp][i]] = 1;
            }
            //here i am thinking to make an additional trait for this grid which will be weight
            //since dijkstra does not do any thing unique without weight(almost same as bfs)
            //so this following condition only apply when there will be weight included
            //so in the place of 1 we will replace the weight of the path or the unit so it will find the best path for us
            // or in the place of unit i will just set different weights for each row but accoding to my conception the unit procedure should
            //just fine (so this algorithm is in making)
            if(distanceFromSource[neighbours[temp][i]] > distanceFromSource[temp]){
                distanceFromSource[neighbours[temp][i]] = distanceFromSource[temp] + 1;
                prev[neighbours[temp][i]] = temp;
            }
        }
    }
    let temp = prev[end];
    let path = [];
    while(temp != start){
        path.push(prev[temp]);
        document.getElementById(temp).style.backgroundColor = "blue";
        temp = prev[temp];
    }
}