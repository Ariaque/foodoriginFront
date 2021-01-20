import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: any = {};
  description: string;
  objet: string;
  phone: number;
  areShown: boolean;

  constructor( private tokenService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() == null || this.tokenService.getToken() === undefined || this.tokenService.getToken().length === 0) {
      this.areShown = true;
    }
  }

  onSubmit(): void {
    if (this.areShown) {

    }
    else {
      this.form.userName = this.tokenService.getUser().get('id');
      this.phone
    }
  }

}
