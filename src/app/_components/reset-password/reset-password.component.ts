import { Component, OnInit } from '@angular/core';
import {TypeTransformateurService} from '../../_services/type-transformateur.service';
import {TypeTransformateurs} from '../../_classes/type-transformateurs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  type: TypeTransformateurs[];
  selectedType: TypeTransformateurs;


  constructor(private typeTransformateurService: TypeTransformateurService) {}

  ngOnInit(): void {
    this.typeTransformateurService.findAll().subscribe((result) => {
      this.type = result;
    });
  }
  onTypeTransformateurSelected(val: any): void {
    this.selectedType = val;
  }

}
