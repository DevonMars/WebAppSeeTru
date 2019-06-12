import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import {HttpClient} from '@angular/common/http';

//import { Message } from '../../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:5000/api/message';
  messages = this.socket.fromEvent<any>('messages');

  constructor(private socket: Socket, private http: HttpClient) { }

  getMessages(userId: String) {
    return this.socket.emit('getMsgs', userId);
  }

  sendMessage(msg) {
    return this.http.post(this.baseUrl, msg);
  }

  // newMessage(message: Message) {
  //   this.socket.emit('addMsg', message);
  // }
}
