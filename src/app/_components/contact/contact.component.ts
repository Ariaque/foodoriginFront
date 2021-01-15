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

  constructor( private tokenService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
  }

}
