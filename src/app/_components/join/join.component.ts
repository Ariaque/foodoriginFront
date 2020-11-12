import { Component, OnInit } from '@angular/core';
import { TypeTransformateurService } from '../../_services/type-transformateur.service';
import { AuthService } from '../../_services/auth.service';
import {TypeTransformateur} from '../../_classes/type-transformateur';

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
  siret = this.form.siret;
  type: TypeTransformateur[];
  constructor(private authService: AuthService, private data: TypeTransformateurService) { }

  ngOnInit(): void {
    this.data.findAll().subscribe((result) => {
      console.warn(result);
      this.type = result;
    });
  }

  onSubmit(): void {
    this.authService.register(this.form, this.siret).subscribe(
      data => {
        console.log(data);
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
