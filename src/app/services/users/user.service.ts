import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _usersUrl = environment.serverUrl + '/api/users/'
  private _userUrl = environment.serverUrl + '/api/user/'

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  list() {
    return this.http.get<any>(this._usersUrl)
  }
  single(id : any) {
    return this.http.get<any>(this._userUrl + id)
  }
}
