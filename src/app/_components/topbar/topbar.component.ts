import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {TopbarService} from '../../_services/topbar.service';
import {TokenStorageService} from '../../_services/token-storage.service';

/**
 * Component that represents the topbar
 */
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopbarComponent implements OnInit {

  constructor(public router: Router, public topBarService: TopbarService, private tokenStorage: TokenStorageService) {
  }

  /**
   * Defines the behavior of the "Deconnexion" button in the topbar
   * @param val
   */
  onClick(val: any): void {
    if (val.target.id === 'log_out_btn') {
      this.tokenStorage.signOut();
      this.topBarService.updateStatus();
      this.router.navigate(['/accueil']);
    }
  }
  ngOnInit(): void {
  }
}
