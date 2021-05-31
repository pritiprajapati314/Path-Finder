import { addEmitHelper, textSpanIntersectsWithPosition } from 'typescript';
import board from '../Board';
import Painter from '../utilities/Painter';
import Node from '../utilities/nodes';

class Recursive_Horizontal{
   
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
    async createWallR(x:number, y:number, z: number){
       let S = x*this.column + y;
       let E = x*this.column + z;
       for(let i = S; i<E; i++){
            if(this.Node[i.toString()].isSource || this.Node[i.toString()].isDestination)continue;
            this.Node[i.toString()].isWall = true;
            await this.painter.paintOneNode(i.toString(), 1);
       }
    }
    async createWallC(x:number, y:number, z:number){
        let S = y*this.column + x;
        let E = z*this.column + x;
        for(let i = S; i<E; i += this.column){
            if(this.Node[i.toString()].isSource || this.Node[i.toString()].isDestination)continue;
            this.Node[i.toString()].isWall = true;
            await this.painter.paintOneNode(i.toString(), 1);
        }

    }
    async help(x:number, y:number){
        if(y-x < 2)return;
        let z = Math.floor(Math.random() * (y - x) + x);
        if(z%2 == 1) z++;

        
        await this.createWallR(z,0,this.column);
        let w = Math.floor(Math.random() * (this.column-1 - 2)) + 2;
        w = z*this.column + w;
        this.Node[w.toString()].isWall = false;
        this.painter.paintOneNode(w.toString(), 0);

        await this.help(x, z-1);
        await this.help(z+1, y);
    }
    async recursive_Horizontal(){
        await this.createWallR(0, 0, this.column);
        await this.createWallR(this.row-1, 0, this.column);
        await this.createWallC(0, 0, this.row);
        await this.createWallC(this.column-1, 0, this.row);

        await this.help(1, this.row-2); 
    }
}
export default Recursive_Horizontal;