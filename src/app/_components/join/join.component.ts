import {Component, OnInit} from '@angular/core';
import {TypeTransformateurService} from '../../_services/type-transformateur.service';
import {AuthService} from '../../_services/auth.service';
import {TypeTransformateurs} from '../../_classes/type-transformateurs';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  type: TypeTransformateurs[];
  siret: number;
  confPassword: string;
  selectedType: TypeTransformateurs;

  constructor(private authService: AuthService, private typeTransformateurService: TypeTransformateurService) {
  }

  ngOnInit(): void {
    this.typeTransformateurService.findAll().subscribe((result) => {
      this.type = result;
    });
  }

  onTypeTransformateurSelected(val: any): void {
    this.selectedType = val;
  }

  onSubmit(): void {
    this.authService.register(this.form, this.selectedType, this.siret).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
