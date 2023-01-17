import { Label } from "./label";

export class GroupTransformateur {
     id:number;
     labels:Label[];
     description:string;

    constructor(_id ?:number, _description ?:string, _labels ?:Label[]){
        this.id = _id;
        this.description = _description;
        this.labels = _labels;
    }

}
