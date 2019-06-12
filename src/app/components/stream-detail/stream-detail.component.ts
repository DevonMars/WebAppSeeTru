import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Stream } from '../../models/stream';
import { StreamService } from 'src/app/services/stream/stream.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/models/message';

declare var $: any;
import { StreamComponent } from '../stream/stream.component'

@Component({
  selector: 'app-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.styl']
})
export class StreamDetailComponent implements OnInit, OnDestroy {
  @Input() stream: Stream;
  messages = [];
  // initMessages = [];
  message: Message = {author: '', message: ''};
  messagetxt: String;
  private _msgSub: Subscription;

  constructor(
    private _streamService: StreamService,
    private msgService: MessageService
    ) { }

  ngOnInit() {
    this.getMessages();
    this._msgSub = this.msgService.messages.subscribe(msgs => {
      this.getMessages();
    });
  }

  sendMessage() {
    this.message.message = this.messagetxt;
    this.message.author = '5cff76b5b62f6c001787110b';
    this.message.host = this.stream.host._id;
    //console.log(this.message)
    this.msgService.newMessage(this.message).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  ngOnDestroy() {
    this._msgSub.unsubscribe();
  }

  getMessages() {
    this._streamService.getMessages(this.stream.host._id).subscribe(
      res => {
        //console.table(res)
        this.messages = res
        $('#scrollbox').scrollTop($('#scrollbox').height);
      }
    )
  }
}