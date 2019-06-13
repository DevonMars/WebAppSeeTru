import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

import { Message } from '../../models/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages = this.socket.fromEvent<any>('messages');
  viewers = this.socket.fromEvent<any>('viewers');
  viewSingle = this.socket.fromEvent<any>('viewSingle');
  private _msgUrl = 'http://thecirclebackend.herokuapp.com/api/message/';
  // private _msgUrl = 'http://localhost:5000/api/message';

  constructor(private http: HttpClient, private socket: Socket) { }

  getMessages(userId: String) {
    this.socket.emit('getMsgs', userId);
    return this.socket.fromEvent<any>('getMsgs');
  }

  newMessage(message: Message) {
    //console.table(message)
    return this.http.post<any>(this._msgUrl, message);
  }

  startWatching(userIds: any) {
    //console.log(userIds)
    this.socket.emit('startWatching', userIds, function (data) {
      console.log(data);
    })
  }

  stopWatching(userIds: any) {
    console.log(userIds)
    this.socket.emit('stopWatching', userIds, function (data) {
      console.log(data);
    })
  }

  getViewcount(hostId: any) {
    this.socket.emit('getViewcount', hostId)
  }
}
