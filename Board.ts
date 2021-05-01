import { domainToUnicode } from 'node:url';
import Node from './utilities/nodes'
import BreadthFirstSearch from './algorithms/BreadthFirstSearch';
import DepthFirstSearch from './algorithms/DepthFirstSearch';
import Dijkstra from './algorithms/Dijkstra';
import Painter from './utilities/Painter';
class Board{

    row:number;
    column: number;
    start: number;
    end: number;
    node: Node;
    nodes: Node[];
    wall: number[];
    painter: Painter;

    leftclicked: boolean;

    constructor(m:number, n:number){
        this.leftclicked = false;

        this.row = m;
        this.column = n;
        this.start = 126;              
        this.end = 1200;
        this.nodes = [];
        this.painter = new Painter(); 
        this.wall = Array.apply(null, Array(this.row*this.column)).map(Number.prototype.valueOf,1);         
        this.constructBoard();        
    }

    setStartAndEnd(newStart: number, newEnd: number){
        this.start = newStart;
        this.end = newEnd;

        document.getElementById(this.start.toString()).style.backgroundColor = "green";
        document.getElementById(this.end.toString()).style.backgroundColor = "red";
    }

    setNeighbours(node: Node){
        // reset all neighbours  
        node.neighbours = [];

        //console.log(node);

        if(!node.isWall){
            let r:number = Math.floor((node.getNodeNumber())/this.column);
            let c:number = Math.floor((node.getNodeNumber())%this.column);
        
            //left, right, up, down neighbour
            if(c < this.column-1 && !this.nodes[node.getNodeNumber()+1].isWall) node.neighbours.push(node.getNodeNumber()+1);         
            if(c > 0 && !this.nodes[node.getNodeNumber()-1].isWall) node.neighbours.push(node.getNodeNumber()-1);                 
            if(r < this.row-1 && this.nodes[node.getNodeNumber()+this.column]) node.neighbours.push(node.getNodeNumber()+this.column);        
            if(r > 0 && this.nodes[node.getNodeNumber()+this.column]) node.neighbours.push(node.getNodeNumber()-this.column);
        }
        //find row and column of the index;
    }

    constructBoard(){
        let maze = document.getElementById("maze");
        let name = 0;
        for(let i = 0; i<this.row; i++){
            let newRow = document.createElement("tr");
            for(let j = 0; j<this.column; j++){
                let newColumn = document.createElement("td");
                let temp = name.toString();
                newColumn.id = temp.toString();

                let newNode;
                if(name === this.start){
                    newNode = new Node(temp, false, false, null, true, false);
                }else if(name === this.end){
                    newNode = new Node(temp, false, false, null, false, true);
                }else{
                    newNode = new Node(temp, false, false, null, false, false);
                }
                
                this.nodes.push(newNode);

                name = name +1;

                newColumn.style.width = "24px";
                newRow.appendChild(newColumn);
            }
            newRow.style.height = "24px";
            maze.appendChild(newRow);
        }

        for(let i = 0; i<this.nodes.length; i++){
            this.setNeighbours(this.nodes[i]);
        }
        this.setStartAndEnd(this.start, this.end);
        this.eventListener();
    }


    async eventListener(){
        for(let i = 0; i<this.row*this.column; i++){
            let currentCell = document.getElementById(i.toString());



            currentCell.onmousedown = () =>{
                this.leftclicked = true;

                this.nodes[i].isWall = !this.nodes[i].isWall;

                if(this.nodes[parseInt(currentCell.id)].isWall){
                    this.painter.paintOneNode(currentCell.id, 1);
                    
                }else{
                    this.painter.paintOneNode(currentCell.id, 0);
                }
                
            }

            currentCell.onmouseenter = () => {
                if(this.leftclicked){
                    //currentCell.style.backgroundColor = "orange";
                    this.wall[currentCell.toString()] = 0;
                    this.nodes[i].isWall = !this.nodes[i].isWall;

                    if(this.nodes[i].isWall){
                        this.painter.paintOneNode(currentCell.id, 1);
                    }else{
                        this.painter.paintOneNode(currentCell.id, 0);
                    }
                }
            }
            
            currentCell.onmouseup = () => {
                this.leftclicked = false;
            }
                
        }
    }

    computeNeighbours(){
        for(let i = 0; i<this.nodes.length; i++){
            this.setNeighbours(this.nodes[i]);
        }
    }

    async runBFS(){

        this.computeNeighbours();
        let bfs = new BreadthFirstSearch(this.start, this.end, this.column, this.row, this.nodes);
        await bfs.bfs();
    }  
    async runDFS(){
        let dfs = new DepthFirstSearch(this.start, this.end, this.column, this.row, this.nodes);
        await dfs.initialiseDFS();
    }
    async runDijkstra(){
        let dijkstra = new Dijkstra(this.start, this.end, this.column, this.row, this.nodes);
        await dijkstra.dijkstra(); 
    } 
}

export default Board;



