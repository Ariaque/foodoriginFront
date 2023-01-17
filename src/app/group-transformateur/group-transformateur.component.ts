import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs/operators';
import { error_while_saving_info, group_success } from 'src/global';
import Swal from 'sweetalert2';
import { AddGroupTransformateur } from '../_classes/add-group-transformateur';
import { Label } from '../_classes/label';
import { GroupTransformateurService } from '../_services/group-transformateur.service';
import { LabelService } from '../_services/label.service';

@Component({
  selector: 'app-group-transformateur',
  templateUrl: './group-transformateur.component.html',
  styleUrls: ['./group-transformateur.component.css']
})
export class GroupTransformateurComponent implements OnInit {
  labels: Label[];
  listLabel = new FormControl();
  description = new FormControl();
  constructor( public dialogRef: MatDialogRef<GroupTransformateurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  private labelService: LabelService,
    private grouptransformateurService:GroupTransformateurService, private router: Router,) { 
    }

  ngOnInit(): void {
     // Initializes label's list
     this.labelService.findAll().subscribe((result) => {
      this.labels = result;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save():void{
    if (this.listLabel.value.length == 0 && this.description.value ===""){
        Swal.fire("Pas d'informations choisies");
    }
        let group= new AddGroupTransformateur(this.description.value, this.listLabel.value);
        console.log(group);
        this.grouptransformateurService.save(group).subscribe((res)=>{
          if(res){
            Swal.fire(group_success);
            this.dialogRef.close();
            window.location.reload();
            
          }
        },
        (error) =>{
            Swal.fire(error_while_saving_info);
            this.dialogRef.close();
        })
  }
}
