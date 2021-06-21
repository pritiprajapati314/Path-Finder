import { domainToUnicode } from 'node:url';
import Node from './utilities/Nodes'
import BreadthFirstSearch from './algorithms/BreadthFirstSearch';
import DepthFirstSearch from './algorithms/DepthFirstSearch';
import Dijkstra from './algorithms/Dijkstra';
import Painter from './utilities/Painter';
import Recursive_Horizontal from './maze/Rhorizontal';
import Recursive_Vertical from './maze/RVertical'
import Recursive from './maze/Recursive';
import Random from './maze/Random';
import Reset from './utilities/Reset';
import { randomBytes } from 'node:crypto';
import { textChangeRangeIsUnchanged } from 'typescript';


class Board{

    row:number;
    column: number;
    start: number;
    end: number;

    node: Node[];
    wall: number[];
    painter: Painter;
    reset: Reset;

    leftclicked: boolean;
    startSelected: boolean;
    destinationSelected: boolean;

    disableButton: boolean;
    algorithmID: number;
    firstClick: boolean;

    sl: string;
    dl: string;
    defaultStart: number;
    defaultEnd: number;

    constructor(m:number, n:number){
        this.leftclicked = false;
        this.startSelected = false;
        this.destinationSelected = false;

        this.disableButton = false;
        this.algorithmID = 0;
        this.firstClick = false;

        this.sl = "O";
        this.dl = "#";

        this.row = m;
        this.column = n;
        this.start = 66;              
        this.end = 1200;
        this.node = [];
        this.painter = new Painter(); 
        this.reset = new Reset();
        this.wall = Array.apply(null, Array(this.row*this.column)).map(Number.prototype.valueOf,1);         
        this.constructBoard();        
    }

    setNeighbours(node: Node){
        // reset all neighbours  
        node.neighbours = [];

        if(!node.isWall){
            let r:number = Math.floor((node.getNodeNumber())/this.column);
            let c:number = Math.floor((node.getNodeNumber())%this.column);
        
            //left, right, up, down neighbour
            if(c < this.column-1 && !this.node[node.getNodeNumber()+1].isWall) node.neighbours.push(node.getNodeNumber()+1);         
            if(c > 0 && !this.node[node.getNodeNumber()-1].isWall) node.neighbours.push(node.getNodeNumber()-1);                 
            if(r < this.row-1 && this.node[node.getNodeNumber()+this.column]) node.neighbours.push(node.getNodeNumber()+this.column);        
            if(r > 0 && this.node[node.getNodeNumber()+this.column]) node.neighbours.push(node.getNodeNumber()-this.column);
        }
        //find row and column of the index;
    }

    constructBoard(){
        let maze = document.getElementById("maze");
        let name = 0;

        let rowMid = Math.floor(this.row/2);
        this.defaultStart =Math.floor(rowMid*this.column)+9;
        this.defaultEnd =Math.floor((rowMid+1)*this.column)-10;
        this.start = this.defaultStart;
        this.end = this.defaultEnd;

        for(let i = 0; i<this.row; i++){
            let newRow = document.createElement("tr");
            for(let j = 0; j<this.column; j++){
                let newColumn = document.createElement("td");
                let temp = name.toString();
                newColumn.id = temp.toString();

                let newNode: any;
                if(name === this.start) newNode = new Node(temp, false, false, null, true, false, false);
                else if(name === this.end) newNode = new Node(temp, false, false, null, false, true, false);
                else newNode = new Node(temp, false, false, null, false, false, false);
                
                this.node.push(newNode);

                name++;

                newRow.appendChild(newColumn);
            }
            maze.appendChild(newRow);
        }

        for(let i = 0; i<this.node.length; i++)this.setNeighbours(this.node[i]);

        document.getElementById(this.start.toString()).innerText = this.sl;
        document.getElementById(this.end.toString()).innerText = this.dl;
        this.eventListener();
    }


    async eventListener(){
        for(let i = 0; i<this.row*this.column; i++){
            let currentCell = document.getElementById(i.toString());

            if(this.disableButton)return;

            currentCell.onmousedown = (e) =>{
                if(this.disableButton)return;
                e.preventDefault();

                if(this.leftclicked){
                    if(this.startSelected){
                        currentCell.innerHTML = this.sl;
                        this.node[i].isSource = false;
                    }
                    else if(this.destinationSelected){
                        currentCell.innerHTML = this.dl;
                        this.node[i].isDestination = false;
                    }
                    this.leftclicked = false;
                    return;
                }

                this.leftclicked = true;

                if(!this.node[i].isSource && !this.node[i].isDestination){
                    this.node[i].isWall = !this.node[i].isWall;

                    if(this.node[parseInt(currentCell.id)].isWall){
                        this.painter.paintOneNode(currentCell.id, 1);
                        
                    }else{
                        this.painter.paintOneNode(currentCell.id, 0);
                    }
                }
                else if(this.node[i].isSource){
                    this.startSelected = true;
                    currentCell.innerHTML = this.sl;
                }
                else{
                    this.destinationSelected = true;
                    currentCell.innerHTML = this.dl;
                }
            }

            currentCell.onmouseleave = () =>{
                if(this.disableButton)return;

                if(this.leftclicked){
                    if(this.startSelected || this.destinationSelected){
                        currentCell.innerHTML = "";
                        if(this.node[i].isSource && this.destinationSelected){
                            currentCell.innerHTML = this.sl;
                        }
                        else if(this.node[i].isDestination && this.startSelected){
                            currentCell.innerHTML = this.dl;
                        }
                        if(this.algorithmID > 0 && this.startSelected){
                            this.node[i].isSource = false;
                        }
                        else if(this.algorithmID > 0 && this.destinationSelected){
                            this.node[i].isDestination = false;
                        }
                    }
                    if(this.node[i].isWall){
                        this.painter.paintOneNode(currentCell.id, 1);
                    }
                    if(this.node[i].weight){
                        currentCell.innerHTML = "*";
                    }
                }
            }

            currentCell.onmouseenter = () => {
                if(this.disableButton)return;

                if(this.leftclicked){
                    if(!this.startSelected && !this.destinationSelected && (!this.node[i].isDestination && !this.node[i].isSource)){
                        this.wall[currentCell.toString()] = 0;
                        this.node[i].isWall = !this.node[i].isWall;

                        if(this.node[i].isWall){
                            this.painter.paintOneNode(currentCell.id, 1);
                        }
                        else{
                            this.painter.paintOneNode(currentCell.id, 0);
                        }
                        return;
                    }
                    else if(this.startSelected){
                        currentCell.innerHTML = this.sl;
                        this.painter.paintOneNode(currentCell.id, 0);

                        if(this.algorithmID > 0 && this.firstClick){
                            this.node[i].isSource = true;
                            this.start = i;
                            if(this.node[i].isWall){
                                this.node[i].isWall = false;
                                this.reCompute();
                                this.node[i].isWall = true;
                            }else this.reCompute();   
                        }

                    }
                    else if(this.destinationSelected){
                        currentCell.innerHTML = this.dl;
                        this.painter.paintOneNode(currentCell.id, 0);

                        if(this.algorithmID > 0 && this.firstClick){
                            this.node[i].isDestination = true;
                            this.end = i;
                            if(this.node[i].isWall){
                                this.node[i].isWall = false;
                                this.reCompute();
                                this.node[i].isWall = true;
                            }else this.reCompute();   
                        }
                    }
                }
            }
            currentCell.onmouseup = () => {

                if(this.disableButton)return;

                this.leftclicked = false;
                if(this.destinationSelected && this.node[i].isSource){
                    currentCell.innerHTML = this.sl;
                    this.node[i].isDestination = false;
                    this.node[this.start].isSource = true;

                    document.getElementById(this.end.toString()).innerHTML = this.dl;
                    this.node[this.end].isDestination = true;
                    this.destinationSelected = false;
                }
                else if(this.startSelected && this.node[i].isDestination){
                    currentCell.innerHTML = this.dl;
                    this.node[i].isSource = false;
                    this.node[this.end].isDestination = true;

                    document.getElementById(this.start.toString()).innerHTML = this.sl;
                    this.node[this.start].isSource = true;
                    this.startSelected = false;
                }
                else if(this.destinationSelected){
                    this.node[i].isDestination = true;
                    this.destinationSelected = false;
                    this.end = i;
                }
                else if(this.startSelected){
                    this.node[i].isSource = true;
                    this.startSelected = false;
                    this.start = i;
                }
            }
        }
    }
    async clearPath(){
        for(let i = 0; i<this.row*this.column; i++){
            this.node[i].visited = false;
            this.node[i].parent = null;
            if(!this.node[i].isWall){
                this.painter.paintOneNode(i.toString(), 0);
            }
        }
    }

    async reCompute(){
        this.clearPath();
        switch(this.algorithmID){
            case 1:
                let bfs = new BreadthFirstSearch(this.start, this.end, this.column, this.row, this.node, this.painter);
                bfs.fastbfs();
                break;
            case 2:
                let dfs = new DepthFirstSearch(this.start, this.end, this.column, this.row, this.node, this.painter);
                dfs.fastInitialiseDFS();
                break;
            case 3: 
                let dijkstra = new Dijkstra(this.start, this.end, this.column, this.row, this.node, this.painter);
                dijkstra.fastDijkstra();
                break;
            default:
                console.log("chose the algorithm first");
        }
    }

    async defaultSetting(){
        this.start = this.defaultStart
        this.end = this.defaultEnd;
        this.node[this.start].isSource = true;
        this.node[this.end].isDestination = true;
        document.getElementById(this.start.toString()).innerText = this.sl;
        document.getElementById(this.end.toString()).innerText = this.dl;
        this.firstClick = false;
        this.painter.speed = 1;
    }


    async clearScreen(){
        if(this.disableButton)return;
        for(let i = 0; i<this.row*this.column; i++){
            document.getElementById(i.toString()).style.backgroundColor = "white";  
            document.getElementById(i.toString()).innerText = "";
        }
        for(let i = 0; i<this.row*this.column; i++){
            this.node[i].isWall = false;
            this.node[i].parent = null;
            this.node[i].visited = false;
            this.node[i].weight = false;
            this.node[i].isSource = false;
            this.node[i].isDestination = false;
        }
        this.defaultSetting();
    }

    async addWeights(){
        for(let i = 0; i<this.row*this.column; i++){
            if(i == this.start || i == this.end || this.node[i.toString()].isWall)continue;
            let z = Math.floor(Math.random() * 9 + 1);
            if(z%2 == 0){
                z = Math.floor(Math.random() * 9 + 1);
                if(z <= 6){
                    this.node[i.toString()].weight = true;
                    document.getElementById(i.toString()).innerText = '*';
                }
            }
        }
    }


    async runBFS(){
        if(this.disableButton)return;
        else this.disableButton = true;
        let bfs = new BreadthFirstSearch(this.start, this.end, this.column, this.row, this.node, this.painter);
        await bfs.bfs();
        this.disableButton = false;
    }  
    async runDFS(){
        if(this.disableButton)return;
        else this.disableButton = true;
        let dfs = new DepthFirstSearch(this.start, this.end, this.column, this.row, this.node, this.painter);
        await dfs.initialiseDFS();
        this.disableButton = false;
    }
    async runDijkstra(){
        if(this.disableButton)return;
        else this.disableButton = true;
        let dijkstra = new Dijkstra(this.start, this.end, this.column, this.row, this.node, this.painter);
        await dijkstra.dijkstra(); 
        this.disableButton = false;
    } 
    async runRecursive_Horizontal(){
        this.clearScreen();
        if(this.disableButton)return;
        else this.disableButton = true;
        let recurrsiveHorizontal = new Recursive_Horizontal(this.start, this.end, this.column, this.row, this.node, this.painter);
        await recurrsiveHorizontal.recursive_Horizontal();
        this.disableButton = false;
    }
    async runRecursive_Vertical(){
        this.clearScreen();
        if(this.disableButton)return;
        else this.disableButton = true;
        let recurrsiveVertical = new Recursive_Vertical(this.start, this.end, this.column, this.row, this.node, this.painter);
        await recurrsiveVertical.recursive_Vertical();
        this.disableButton = false;
    }
    async runRecursive(){
        this.clearScreen();
        if(this.disableButton)return;
        else this.disableButton = true;
        let recurrsive = new Recursive(this.start, this.end, this.column, this.row, this.node, this.painter);
        await recurrsive.recursive();
        this.disableButton = false;
    }
    async runRandom(){
        this.clearScreen()
        if(this.disableButton)return;
        else this.disableButton = true;
        //document.getElementsByClassName("nav-item").disabled = true;
        let random = new Random(this.start, this.end, this.column, this.row, this.node, this.painter);
        await random.createRandom();
        this.disableButton = false;
    }
}

export default Board;

/*

deal with the bugg 
{
    depth first start is acting weird 
    also dijkstra 
    they both acting like shit
}
disabled color
animation
code presentation
*/

