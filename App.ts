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
    console.log("no");
    board.painter.speedSelection(100/Math.floor(parseInt(speed.value)));
}


board.algorithmID = 0;
buttonBFS.onclick = () => {
    board.algorithmID = 1;
    buttonFindPath.innerHTML = "Breadth First Search";
   
}

buttonDFS.onclick = ()=>{
    board.algorithmID = 2;
    buttonFindPath.innerHTML = "Depth First Search";
   
}

buttonDijkstra.onclick = () =>{
    board.algorithmID = 3;
    buttonFindPath.innerHTML = "Dijkstra";
    
}

buttonFindPath.onclick = () =>{
    console.log("i");
    board.firstClick = true;
    board.clearPath();
    switch(board.algorithmID){
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
            alert("Please chose an algorithm first");
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



//pop up board 
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks the button, open the modal 
modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}