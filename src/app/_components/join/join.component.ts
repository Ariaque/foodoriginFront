import { Component, OnInit } from '@angular/core';
import { TypeTransformateurService } from '../../_services/type-transformateur.service'

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  type  : any;
  constructor(private data:TypeTransformateurService,) { }

  ngOnInit(): void {
    this.data.findAll().subscribe((result)=>{
      console.warn(result);
      this.type = result;
    })
  }

}
