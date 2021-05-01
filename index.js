//constrains

let size = 1;
let row = 23;
let column = 55;
let timeSpeed = 1;
let array = Array.apply(null, Array(row*column)).map(Number.prototype.valueOf,0);
let neighbours = [];
let start = 78;
let end = 1000;


//Maze
function neighbour(index){

    //find row and column of the index
    let r = Math.floor((index)/column);
    let c = Math.floor((index)%column);

    let tempArr = [];

    //left, right, up, down neighbour
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
            name = name +1;
            newColumn.id = temp;
            newColumn.style.width = "24px";
            newRow.appendChild(newColumn);
        }
        newRow.style.height = "24px";
        maze.appendChild(newRow);
    }
    
    document.getElementById(start).style.backgroundColor = "green";
    document.getElementById(end).style.backgroundColor = "red";
    //depthfirstSearch(start, end); 
    //breadthFirstSearch(start, end); 
    //dijkstra(start,end);
}

//animation

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function traversingNode(index){
    document.getElementById(index).style.backgroundColor = "blue";
}


//algorithm

//depth first search
function depthfirstSearchInitiator(){
    depthfirstSearch(start, end);
}

function depthfirstSearch(start, end){
    if(start == end)return true;
    array[start] = 1;
    let size = neighbours[start].length;
    for(let i = 0; i<size; i++){
        let temp = neighbours[start][i];
        if(array[temp] == 0 && depthfirstSearch(temp, end) == true){
            //document.getElementById(temp).style.backgroundColor = "blue";
            if(temp != end)
                document.getElementById(temp).style.backgroundColor = "yellow";
            return true;
        }
    }
    return false;
}

//breadth first search
function breadthFirstSearch(){
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


//dijkstra
function dijkstra(){
    let queue = [];
    let index = 0;
    queue.push(start);
    array[start] = 1;
    let prev = Array.apply(null, Array(row*column)).map(Number.prototype.valueOf,-1);
    let distanceFromSource = Array.apply(null, Array(row*column)).map(Number.prototype.valueOf,Infinity);
    prev[start] = -1;
    distanceFromSource[start] = 0;
    while(true){
        let temp = queue[index];
        if(temp == end)break;//at last we have to remove this condition and let it traverse it till the end
        //and then find the path from this point to the first point
        index++;
        for(let i = 0; i<neighbours[temp].length; i++){
            if(array[neighbours[temp][i]] == 0){
                if(neighbours[temp][i] != end)
                    document.getElementById(neighbours[temp][i]).style.backgroundColor = "pink";
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
            if(distanceFromSource[neighbours[temp][i]] > distanceFromSource[temp] + 1){
                distanceFromSource[neighbours[temp][i]] = distanceFromSource[temp] + 1;
                prev[neighbours[temp][i]] = temp;
                console.log("hello");
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