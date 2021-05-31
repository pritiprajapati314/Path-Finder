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
    board: Board;
    painter: Painter 

    constructor(start:number, end:number, column:number, row:number, neighbours: Node[], painter: Painter){
        this.start = start;
        this.end = end;
        this.column = column;
        this.row = row;
        this.node = neighbours;
        this.painter = painter;
    }

    async dijkstra(){
        let queue = [];
        let index = 0;
        queue.push(this.start);
       
        this.node[this.start].visited = true;
        await this.painter.paintOneNode(this.start.toString(), 2);

        let distanceFromSource = Array.apply(null, Array(this.row*this.column)).map(Number.prototype.valueOf,Infinity);
       
        this.node[this.start].parent = null;
        distanceFromSource[this.start] = 0;
        while(true){
            let temp = queue[index];
            if(temp == this.end)break;

            index++;
            for(let i = 0; i<this.node[temp].neighbours.length; i++){

                let cost = 1;
                if(this.node[this.node[temp].neighbours[i]].weight)cost = 5;
                
                if(!this.node[this.node[temp].neighbours[i]].isWall){
                    if(!this.node[this.node[temp].neighbours[i]].visited){
                        await this.painter.paintOneNode(this.node[temp].neighbours[i].toString(), 2);
                        queue.push(this.node[temp].neighbours[i]);
                        this.node[this.node[temp].neighbours[i]].visited = true;
                        this.node[this.node[temp].neighbours[i]].parent = this.node[temp].nodeId;
                    }
                    
                    if(distanceFromSource[this.node[temp].neighbours[i]] > distanceFromSource[temp] + cost){
                        distanceFromSource[this.node[temp].neighbours[i]] = distanceFromSource[temp] + cost;
                        this.node[this.node[temp].neighbours[i]].parent = this.node[temp].nodeId;
                    }
                }
            }
        }
        let path = [];
        path.push(this.end);
        let temp = this.node[this.end].parent;
        while(temp != this.start.toString()){
            path.push(temp);
            temp = this.node[temp].parent;
        }
        path.push(this.start);

        path.reverse();
        for(let i = 0; i<path.length; i++)
            await this.painter.paintOneNode(path[i], 3);
    }
}
export default Dijkstra;