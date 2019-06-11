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
  initMessages = [];
  message: Message;
  private _msgSub: Subscription;

  constructor(
    private _streamService: StreamService,
    private msgService: MessageService
    ) { }

  ngOnInit() {
    this._streamService.getMessages(this.stream.host._id).subscribe(
      res => {
        console.log(res)
        this.messages = res
      }
    )//.unsubscribe();
    this._msgSub = this.msgService.messages.subscribe(msgs => {
      console.log(msgs);
      this.messages = msgs;
    });
  }

  sendMessage() {
    this.msgService.newMessage(this.message);
  }

  ngOnDestroy() {
    this._msgSub.unsubscribe();
  }

}
