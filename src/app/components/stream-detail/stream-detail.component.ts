import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Stream } from '../../models/stream';
import { StreamService } from 'src/app/services/stream/stream.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.styl']
})
export class StreamDetailComponent implements OnInit, OnDestroy {
  @Input() stream: Stream;
  messages = [];
  message: Message = { author: '', message: '' };
  messagetxt: String;
  private _msgSub: Subscription;

  constructor(
    private _streamService: StreamService,
    private msgService: MessageService
  ) { }

  ngOnInit() {
    this.getMessages();
    this._msgSub = this.msgService.messages.subscribe(() => {
      this.getMessages();
    });
  }

  ngOnDestroy() {
    this._msgSub.unsubscribe();
  }

  getMessages() {
    this._streamService.getMessages(this.stream.host._id).subscribe(
      res => this.messages = res 
    )
  }

  sendMessage() {
    this.message.message = this.messagetxt;
    this.message.author = '5cff76b5b62f6c001787110b';
    this.message.host = this.stream.host._id;
    this.msgService.newMessage(this.message).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
}