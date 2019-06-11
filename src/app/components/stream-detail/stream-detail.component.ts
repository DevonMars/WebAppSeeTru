import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Stream } from '../../models/stream';
import { StreamService } from 'src/app/services/stream/stream.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { StreamComponent } from '../stream/stream.component'

@Component({
  selector: 'app-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.styl']
})
export class StreamDetailComponent implements OnInit, OnDestroy {
  @Input() stream: Stream;
  messages = [];
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
    // this._msgSub = this.msgService.messages.subscribe(msgs => {
    //   console.log(msgs);
    //   this.messages = msgs;
    // });
    }  

  ngOnDestroy() {
    this._msgSub.unsubscribe();
  }

}
