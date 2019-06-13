import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Stream } from '../../models/stream';
import { StreamService } from 'src/app/services/stream/stream.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/models/message';
declare var $: any;

@Component({
  selector: 'app-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.styl']
})
export class StreamDetailComponent implements OnInit, OnDestroy {
  @Input() stream: Stream;
  messages = [];
  // initMessages = [];
  message: Message = { authorname: '', author: '', message: '' };
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
      res => {
        this.messages = res
        this.autoScroll();
      }
    )
}

  sendMessage() {
    this.message.message = this.messagetxt;
    this.message.authorname = localStorage.getItem('username')
    this.message.author = localStorage.getItem('userId');
    this.message.host = this.stream.host._id;
    console.log(this.message)
    this.msgService.newMessage(this.message).subscribe(
      res => {
        this.messagetxt = ''
        console.log(res)
      },
      err => console.log(err)
    )
    this.autoScroll();
  }

  autoScroll() {
    $(".scrollfield.chatbox").stop().animate({ scrollTop: $(".scrollfield.chatbox")[0].scrollHeight}, 1000);
  }
  
}