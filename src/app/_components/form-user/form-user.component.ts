import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { LabelService } from '../../_services/label.service'
import { CertificationService } from '../../_services/certification.service'

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  certificat : any; 
  label : any;

  constructor(private postData:LabelService,private api:CertificationService ){}

  ngOnInit(): void {
    this.postData.findAll().subscribe((result)=>{
      console.warn(result);
      this.label = result;
    })
    this.api.findAll().subscribe((result)=>{
      console.warn(result);
      this.certificat = result;
    })
  }

}
