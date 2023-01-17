export class OneToOne {
    mainId:number;
    foreignId:number;

    constructor(mainId ?:number, foreignId ?:number){
        this.foreignId = foreignId;
        this.mainId = mainId;
    }
}
