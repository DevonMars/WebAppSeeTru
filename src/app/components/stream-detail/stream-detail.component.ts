import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Stream } from '../../models/stream';
import { StreamService } from 'src/app/services/stream/stream.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/models/message';
declare var $: any;
import { StreamComponent } from '../stream/stream.component';
import { SignService } from 'src/app/services/sign/sign.service';

@Component({
  selector: 'app-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.styl']
})
export class StreamDetailComponent implements OnInit, OnDestroy {
  @Input() stream: Stream;
  messages = [];
  message: Message = { authorname: '', author: '', message: '', signature: '', certificate: this._sign.certificate};
  messagetxt: String;
  streamViews: Number;
  private _msgSub: Subscription;
  private _strmSub: Subscription;

  constructor(
    private _streamService: StreamService,
    private msgService: MessageService,
    private _sign: SignService
  ) { }

  ngOnInit() {
    this.getMessages();
    this._msgSub = this.msgService.messages.subscribe(() => {
      this.getMessages();
    });
    this.getViewers();
    this._strmSub = this.msgService.streamViews.subscribe(amount => {
      console.log({
        stream: this.stream.title,
        amount: amount
      });
      this.streamViews = amount;
    });
  }

  ngOnDestroy() {
    this._msgSub.unsubscribe();
    this._strmSub.unsubscribe();
  }

  getViewers() {
    console.log('GET viewers from ' + this.stream.title);
    this.msgService.getViewcount(this.stream.host._id);
  }

  getMessages() {
    console.log('GET messages ' +  this.stream.title);
    this._streamService.getMessages(this.stream.host._id).subscribe(
      res => {
        this.messages = res;
        this.autoScroll();
      }
    );
  }

  sendMessage() {
    this.message.message = this.messagetxt;
    this.message.authorname = localStorage.getItem('username');
    this.message.author = localStorage.getItem('userId');
    this.message.host = this.stream.host._id;
    const signature = this._sign.signMessage(this.messagetxt);
    this.message.signature = signature.signature;
    this.msgService.newMessage(this.message).subscribe(
      res => {
        this.messagetxt = '';
        console.log(res);
      },
      err => console.log(err)
    );
    this.autoScroll();
  }

  autoScroll() {
    $(".scrollfield.chatbox").stop().animate({ scrollTop: $(".scrollfield.chatbox")[0].scrollHeight}, 1000);
  }

}
