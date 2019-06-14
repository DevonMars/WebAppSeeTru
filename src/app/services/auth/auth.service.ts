import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = environment.serverUrl + '/api/user/register';
  private _loginUrl = environment.serverUrl + '/api/user/login';

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    console.log(user);
    // sessionStorage.setItem('id', user._id) //hier moet een id komen
    return this.http.post<any>(this._loginUrl, user);

  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/login']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  

}
