import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

import { Message } from '../../models/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages = this.socket.fromEvent<any>('messages');
  private _msgUrl = "http://thecirclebackend.herokuapp.com/api/message/"

  constructor(private http: HttpClient, private socket: Socket) { }

  getMessages(userId: String) {
    this.socket.emit('getMsgs', userId);
    return this.socket.fromEvent<any>('getMsgs');
  }

  newMessage(message: Message) {
    console.table(message)
    return this.http.post<any>(this._msgUrl, message);
  }
}
