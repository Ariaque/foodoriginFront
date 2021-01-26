import {Injectable} from '@angular/core';
import {TokenStorageService} from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class TopbarService {

  isConnected: boolean;
  isAdmin: boolean;
  token: string;
  userRole: string;

  constructor(private tokenStorageService: TokenStorageService) {
    this.updateStatus();
  }


  updateStatus(): void {
    this.token = this.tokenStorageService.getToken();
    if (this.tokenStorageService.getUser() !== null) {
      this.userRole = this.tokenStorageService.getUser().roles[0];
      this.isAdmin = this.userRole === 'ROLE_ADMIN';
    }
    if (this.token === null || this.token === '') {
      this.isConnected = false;
    }
    else {
      this.isConnected = true;
    }
  }
}
