import {Injectable} from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {Erole} from "../_classes/erole.enum";

/**
 * Service that checks the status of user: connected or not and user or admin
 */
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
      this.isAdmin = this.userRole === Erole.role_admin;
    }
    if (this.token === null || this.token === '') {
      this.isConnected = false;
    }
    else {
      this.isConnected = true;
    }
  }
}
