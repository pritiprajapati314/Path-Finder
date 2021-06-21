import { addEmitHelper, textSpanIntersectsWithPosition } from 'typescript';
import board from '../Board';
import Painter from '../utilities/Painter';
import Node from '../utilities/Nodes';

class Random{
   
    Node : Node[];
    start : number;
    end : number;
    column : number;
    row : number;
    painter : Painter;
    constructor(start:number, end:number, column:number, row:number, node:Node[], painter: Painter){
        this.start = start;
        this.end = end;
        this.column = column;
        this.row = row;
        this.Node = node;
        this.painter = painter;
    }

    async createRandom(){
        for(let i = 0; i<this.row*this.column; i++){
            if(i == this.start || i == this.end)continue;
            let z = Math.floor(Math.random() * 9 + 1);
            if(z%2 == 0){
                z = Math.floor(Math.random() * 9 + 1);
                if(z <= 6){
                    this.Node[i.toString()].isWall = true;
                    this.painter.paintOneNode(i.toString(),1);
                }
            }
        }
    }
}
export default Random;