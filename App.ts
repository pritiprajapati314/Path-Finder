import Board from './Board';


let board = new Board(27, 59);

let buttonBFS = document.getElementById('buttonBFS');
let buttonDijkstra = document.getElementById('buttonDijkstra');
let buttonDFS = document.getElementById('buttonDFS');
let buttonHorizontal = document.getElementById('buttonHorizontal');
let buttonVertical = document.getElementById('buttonVertical');
let buttonRecursive = document.getElementById('buttonRecursive');
let buttonRandom = document.getElementById('buttonRandom');


let buttonClearScreen = document.getElementById('buttonClearScreen');
let butttonAddWeight = document.getElementById('buttonAddWeight');
let buttonFindPath = document.getElementById('buttonFindPath');
let speed = document.getElementById("speedSlider") as HTMLInputElement;


speed.oninput = () =>{
    board.painter.speedSelection(100/Math.floor(parseInt(speed.value)));
}

let algorithmNumber = 0;
buttonBFS.onclick = () => {
    algorithmNumber = 1;
    buttonFindPath.innerHTML = "Breadth First Search";
   
}

buttonDFS.onclick = ()=>{
    algorithmNumber = 2;
    buttonFindPath.innerHTML = "Depth First Search";
   
}

buttonDijkstra.onclick = () =>{
    algorithmNumber = 3;
    buttonFindPath.innerHTML = "Dijkstra";
    
}

buttonFindPath.onclick = () =>{
    switch(algorithmNumber){
        case 1:
            board.runBFS();
            break;
        case 2:
            board.runDFS();
            break;
        case 3:
            board.runDijkstra();
            break;
        default:
            console.log("error");
    }
}

buttonHorizontal.onclick = () =>{
    board.runRecursive_Horizontal();
}

buttonVertical.onclick = () =>{
    board.runRecursive_Vertical();
}

buttonRecursive.onclick = () =>{
    board.runRecursive();
}

buttonRandom.onclick = () =>{
    board.runRandom();
}

buttonClearScreen.onclick = () =>{
    board.clearScreen();
}

butttonAddWeight.onclick = () =>{
    board.addWeights();
}