import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  private _streamUrl = "http://thecirclebackend.herokuapp.com/api/stream/"
  private _messageUrl = "http://thecirclebackend.herokuapp.com/api/messages/host/"
  //private _streamUrl = "http://localhost:5000/api/stream"

  constructor(private http: HttpClient, private _router: Router) { }

  list() {
    return this.http.get<any>(this._streamUrl + 'all');
  }

  getMessages(hostId: String) {
    return this.http.get<any>(this._messageUrl + hostId);
  }

}
