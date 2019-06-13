import { CanActivate,
    Router
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import {AuthService} from './auth.service';


  @Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService, 
    private _router: Router
    ) {}

  canActivate() : any {
    // check if user is logged in
    if (this._authService.loggedIn()) {
        return true;
    } else {
    this._router.navigate(['/login']);
    return false;
    }

  }

}