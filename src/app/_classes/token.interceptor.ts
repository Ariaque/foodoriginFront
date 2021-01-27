import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {TokenStorageService} from '../_services/token-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {  constructor(public tokenService: TokenStorageService) {}  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${this.tokenService.getToken()}`
    }
  });
  return next.handle(request);
}
}
