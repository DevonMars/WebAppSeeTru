import { Component, OnInit, OnDestroy } from '@angular/core';
import { StreamService } from '../../services/stream/stream.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.styl']
})
export class StreamComponent implements OnInit, OnDestroy {
  streams = [];
  activeStreams = [];
  messages = [];
  private _viewSub: Subscription;
  viewAmount: Number;

  constructor(private _streamService: StreamService, private msgService: MessageService) { }

  ngOnInit() {
    this._streamService.list()
      .subscribe(
        res => {
          this.streams = res
        },
        err => {
          console.log(err)
        }
      )
    this.msgService.viewers.subscribe(amount => {
      console.log('viewers: ', amount);
      this.viewAmount = amount;
    });
  }

  ngOnDestroy() {
    this._viewSub.unsubscribe();
  }

  addToActiveStreams(stream: any) {
    if (this.activeStreams.length <= 3) {
      for (let i of this.activeStreams) {
        if (i == stream) {
          console.log('You are already watching this stream')
          return false;
        }
      };
      this.activeStreams.push(stream)
      //console.log(this.activeStreams)
    } else {
      console.log('Too many streams open')
    }
  }

  removeStream(i: number) {
    this.activeStreams.splice(i, 1);
  }

}
