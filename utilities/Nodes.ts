class Node{
    nodeId: string;
    isWall: boolean;
    visited: boolean;
    parent: string;
    isSource: boolean;
    weight: boolean
    isDestination: boolean;
    neighbours: number[];
    constructor( nodeId:string, wall:boolean, visited:boolean, parent: string, isSource: boolean, isDestination: boolean, weight: boolean){
        this.nodeId = nodeId;
        this.isWall = wall
        this.visited = visited;
        this.parent = parent;
        this.isSource = isSource;
        this.isDestination = isDestination;
        this.weight = weight;
        this.neighbours = [];
    }

    public getNodeNumber(){
        return parseInt(this.nodeId);
    }
}


export default Node;