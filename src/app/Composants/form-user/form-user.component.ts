import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { LabelService } from '../../services/label.service'

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  label    = "";
  certificat = "";
  data : any;

  constructor(private postData:LabelService){}

  ngOnInit(): void {
    this.postData.findAll().subscribe((result)=>{
      console.warn(result)
      this.data = result
    })
  }

}
