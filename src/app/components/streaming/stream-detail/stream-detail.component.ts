import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Stream } from '../../../models/stream';
import { StreamService } from 'src/app/services/stream/stream.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/models/message';
import { StreamComponent } from '../stream/stream.component'
import { SignService } from 'src/app/services/sign/sign.service';
//import { StreamComponent } from 'src/app/components/streaming/stream/stream.component'

declare var $: any;

@Component({
  selector: 'app-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.styl']
})
export class StreamDetailComponent implements OnInit, OnDestroy {
  @Input() stream: Stream;
  messages = [];
  viewers: Number;
  message: Message = { authorname: '', author: '', message: '', signature: '', certificate: this._sign.certificate };
  messagetxt: String;
  private _msgSub: Subscription;
  private _viewSub: Subscription;
  disableButton = false;

  constructor(
    private _streamService: StreamService,
    private msgService: MessageService,
    private _sign: SignService,
    private _streamComponent: StreamComponent
  ) { }

  ngOnInit() {
    this.getMessages();
    this._msgSub = this.msgService.messages.subscribe(() => {
      this.getMessages();
    });
    this._viewSub = this.msgService.viewSingle.subscribe(() => {
      this.getViewers();
    })
  }

  ngOnDestroy() {
    this._msgSub.unsubscribe();
  }

  getMessages() {
    this._streamService.getMessages(this.stream.host._id).subscribe(
      res => {
        this.messages = res;
        this.autoScroll();
      }
    );
  }

  getViewers() {
    this._streamService.getViewCount(this.stream._id).subscribe(
      res => {
        this.viewers = res.viewers;
      }
    );
  }

  sendMessage() {
    this.message.message = this.messagetxt;
    this.message.authorname = localStorage.getItem('username');
    this.message.author = localStorage.getItem('userId');
    this.message.host = this.stream.host._id;
    const signature = this._sign.signMessage(this.messagetxt);
    this.message.signature = signature;
    console.log(this.message);
    this.msgService.newMessage(this.message).subscribe(
      res => {
        this.messagetxt = '';
        this.disableButton = false;
        console.log(res);
        this.getMessages();
      },
      err => console.log(err)
    );
    this.autoScroll();
  }

  autoScroll() {
  $(".scrollfield.bg-light.mt-1.bordered").stop().animate({ scrollTop: $(".scrollfield.bg-light.mt-1.bordered")[0].scrollHeight}, 1000);
  }
}
