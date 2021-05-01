import Board from '../Board';
import Painter from '../utilities/Painter';
import Node from '../utilities/nodes'

class Dijkstra{
    start: number;
    end: number;
    row: number;
    column: number;
    visited: any[];
    node: Node[];
    painter: Painter 

    constructor(start:number, end:number, column:number, row:number, neighbours: Node[]){
        this.start = start;
        this.end = end;
        this.column = column;
        this.row = row;
        this.node = neighbours;
        this.painter = new Painter();
    }

    async dijkstra(){
        let queue = [];
        let index = 0;
        queue.push(this.start);
       
        this.node[this.start].visited = true;
       
        let distanceFromSource = Array.apply(null, Array(this.row*this.column)).map(Number.prototype.valueOf,Infinity);
       
        this.node[this.start].parent = null;
        distanceFromSource[this.start] = 0;
        while(true){
            let temp = queue[index];
            if(temp == this.end)break;

            index++;
            for(let i = 0; i<this.node[temp].neighbours.length; i++){
                if(!this.node[this.node[temp].neighbours[i]].isWall){

                    if(!this.node[this.node[temp].neighbours[i]].visited){
                        if(this.node[temp].neighbours[i] != this.end)
                            await this.painter.paintOneNode(this.node[temp].neighbours[i].toString(), 2);
                        queue.push(this.node[temp].neighbours[i]);
                        this.node[this.node[temp].neighbours[i]].visited = true;
                        this.node[this.node[temp].neighbours[i]].parent = this.node[temp].nodeId;
                    }
                    if(distanceFromSource[this.node[temp].neighbours[i]] > distanceFromSource[temp] + 1){
                        distanceFromSource[this.node[temp].neighbours[i]] = distanceFromSource[temp] + 1;
                        this.node[this.node[temp].neighbours[i]].parent = this.node[temp].nodeId;
                    }

                }
            }
        }
        let temp = this.node[this.end].parent;
        let path = [];
        while(temp != this.start.toString()){
            path.push(temp);
            await this.painter.paintOneNode(temp.toString(), 3);
            temp = this.node[temp].parent;
        }
    }
}
export default Dijkstra;