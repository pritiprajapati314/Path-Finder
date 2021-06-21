import { isPrivateIdentifier } from "typescript";
//hello
class Painter{
    speed: number;
    defaultColor: string;
    wallColor: string;
    pathColor: string;
    visitedColor: string;
    weightColor: string;

    constructor() {
        this.speed = 100;
        this.defaultColor = 'white';
        this.wallColor = '#7b8f8a';
        this.visitedColor = 'rgb(208, 243, 231)';
        this.pathColor = 'rgb(63, 129, 63)';
        this.weightColor = 'pink';
    }

    pause = ()=>{
        return new Promise(resolve => setTimeout(resolve, this.speed))
    }

    speedSelection(newSpeed: number){
        this.speed = newSpeed;
    }

    async paintOneNode(index: string, colorCode: number){
        let cell = document.getElementById(index);
        
        switch(colorCode){
            case 0:
                cell.style.backgroundColor = this.defaultColor;
                break;
            case 1:
                cell.style.backgroundColor = this.wallColor;
                break;
            case 2:
                cell.style.backgroundColor = this.visitedColor;
                break;
            case 3:
                cell.style.backgroundColor = this.pathColor;
                break;
            case 4: 
                cell.style.backgroundColor = this.weightColor;
        }

        await this.pause();
    }
}

export default Painter;