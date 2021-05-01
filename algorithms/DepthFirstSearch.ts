import { timers } from 'jquery';
import Board from '../Board';
import Painter from '../utilities/Painter';
import Node from '../utilities/nodes'

class DepthFirstSearch{
    start: number;
    end: number;
    row: number;
    column: number;
    node: Node[];
    painter: Painter

    constructor(start:number, end:number, column:number, row:number, neighbours:Node[]){
        this.start = start;
        this.end = end;
        this.row = row;
        this.column = column;
        this.node = neighbours;
        this.painter = new Painter();
    }
    async initialiseDFS(){
        let array = [];
        await this.DFS(this.start, this.start, this.end, array);

        
        array.reverse();
        for(let i = 1; i<array.length-1; i++){
            await this.painter.paintOneNode(array[i].toString(), 3);
        }
    }
    async DFS(current:number, start:number, end:number, array: any[]){
        if(current == end)return true;
        this.node[current].visited = true;
        
        if(current != start)
            await this.painter.paintOneNode(current.toString(), 2);

        for(let i = 0; i<this.node[current].neighbours.length; i++){
            let temp = this.node[current].neighbours[i];
            if(!this.node[this.node[current].neighbours[i]].visited && !this.node[this.node[current].neighbours[i]].isWall && await this.DFS(temp, start, end, array) == true){
                array.push(temp);
                return true;
            }
        }
        return false;
    }
}
export default DepthFirstSearch;