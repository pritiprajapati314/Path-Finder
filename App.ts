import Board from './Board';

let board = new Board(23, 55);

let buttonBFS = document.getElementById('buttonBFS');
let buttonDijkstra = document.getElementById('buttonDijkstra');
let buttonDFS = document.getElementById('buttonDFS');

buttonBFS.onclick = () => {
    board.runBFS();
}

buttonDFS.onclick = ()=>{
    board.runDFS();
}

buttonDijkstra.onclick = () =>{
    board.runDijkstra();
}


