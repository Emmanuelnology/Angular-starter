import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { FbAuthService } from './fb-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: FbAuthService,
    private router: Router
    ) { }

  canActivate() { // if logged in return true, otherwise return to login page and return false
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }

  }
}
