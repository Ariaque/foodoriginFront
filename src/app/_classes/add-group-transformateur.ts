export class AddGroupTransformateur {
    private labelIds:number[];
    private description:string;

    constructor(_description ?:string, _labels ?:number[]){
        this.description = _description;
        this.labelIds = _labels;
    }

    getDescription(): string {
        return this.description;
      }
    
    setDescription(desc: string): void {
        this.description= desc;
      }  

    getlabels(): number[] {
        return this.labelIds;
      }
    
    setLabels(labels: number[]): void {
        this.labelIds = labels;
      }  
    
    addLabels(label:number): void{
        this.labelIds.push(label);
    }
}
