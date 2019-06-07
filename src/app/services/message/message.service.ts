import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

//import { Message } from '../../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages = this.socket.fromEvent<any>('messages');

  constructor(private socket: Socket) { }

  getMessages(userId: String) {
    this.socket.emit('getMsgs', userId);
    return this.socket.fromEvent<any>('getMsgs');
  }

  // newMessage(message: Message) {
  //   this.socket.emit('addMsg', message);
  // }
}