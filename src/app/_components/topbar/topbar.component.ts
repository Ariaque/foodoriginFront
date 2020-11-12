import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {TopbarService} from '../../_services/topbar.service';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopbarComponent implements OnInit {

  constructor(public router: Router, public topBarService: TopbarService, private tokenStorage: TokenStorageService) {
  }

  onClick(val: any): void {
    console.log('here');
    if (val.target.id === 'log_out_btn') {
      this.tokenStorage.signOut();
      console.log(this.tokenStorage.getToken());
      this.topBarService.updateStatus();
      this.router.navigate(['/accueil']);
    }
  }


  // navLinks: any[];
  // activeLinkIndex = -1;
  // constructor(private router: Router) {
  //   this.navLinks = [
  //     {
  //       label: 'Accueil',
  //       link: './accueil',
  //       index: 0
  //     }, {
  //       label: 'Mon espace',
  //       link: './user',
  //       index: 1
  //     },
  //     {
  //       label: 'Gestion des comptes',
  //       link: './userValidation',
  //       index: 2
  //     },
  //     {
  //       label: 'Rejoindre',
  //       link: './join',
  //       index: 3
  //     }, {
  //       label: 'Connexion',
  //       link: './login',
  //       index: 4,
  //     }, {
  //       label: 'Déconnexion',
  //       link: './userValidation',
  //       index: 5,
  //     },
  //   ];
  // }
  ngOnInit(): void {
    // this.router.events.subscribe((res) => {
    //   this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    // });
  }
}
