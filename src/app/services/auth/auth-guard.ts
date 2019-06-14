import {CanActivate,Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(): any {     //this function checks if you can enter a route or not.
    if (this._authService.loggedIn()) { //check if user is logged in
      return true;
    } else {
      this._router.navigate(['/login']); // navigate to login page
      return false;
    }

  }

}