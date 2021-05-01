import Board from '../Board';
import Painter from '../utilities/Painter';
import Node from '../utilities/nodes';


// class name PascalCase
// method and function and variables should be camelCase;

class BreadthFirstSearch{
    start: number;
    end: number;
    row: number;
    column: number;
    nodes: Node[];
    painter: Painter
    
    constructor(start:number, end:number, column:number, row:number, neighbours: Node[]){
        this.start = start;
        this.end = end;
        this.column = column;
        this.row = row;
        this.nodes = neighbours;
        this.painter = new Painter();
    }

    async bfs(){
        let queue = [];
        let index = 0;
        queue.push(this.start);
        this.nodes[this.start].visited = true;
      
        this.nodes[this.start].parent = null;
        
        while(true){
            let t = this.nodes[queue[index]];
        
            let flag = false;
            index++;
            for(let i = 0; i<this.nodes[t.nodeId].neighbours.length; i++){
                if(this.nodes[this.nodes[t.nodeId].neighbours[i]].nodeId == this.end.toString()){
                    this.nodes[this.end].parent = t.nodeId;
                    flag = true;
                    break;
                }

                if(!this.nodes[this.nodes[t.nodeId].neighbours[i]].visited && !this.nodes[this.nodes[t.nodeId].neighbours[i]].isWall){

                    await this.painter.paintOneNode(this.nodes[t.nodeId].neighbours[i].toString(), 2);

                    queue.push(this.nodes[t.nodeId].neighbours[i]);
                    this.nodes[this.nodes[t.nodeId].neighbours[i]].visited = true;
                    this.nodes[this.nodes[t.nodeId].neighbours[i]].parent = t.nodeId;
                }
            }
            if(flag)break;
            
        }
        let temp = this.nodes[this.end].parent;
        let path = [];
        while(temp != this.start.toString()){
            path.push(temp);
            await this.painter.paintOneNode(temp, 3);
            temp = this.nodes[temp].parent;
            
        }
    }
}

export default BreadthFirstSearch;