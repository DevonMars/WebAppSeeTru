import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  //private _streamUrl = "http://thecircle-backend.herokuapp.com/api/stream"
  private _streamUrl = "http://localhost:5000/api/stream"

  constructor(private http: HttpClient, private _router: Router) { }

  list() {
    return this.http.get<any>(this._streamUrl + '/all')
  }

}
