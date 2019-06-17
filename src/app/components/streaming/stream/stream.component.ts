import { Component, OnInit, OnDestroy } from '@angular/core';
import { StreamService } from '../../../services/stream/stream.service';
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
      this.viewAmount = amount;
    });
  }

  ngOnDestroy() {
    //this._viewSub.unsubscribe();
    console.log('NIET VERGETEN UNSUBSCRIBE TE FIXEN IN STREAM.COMPONENT.TS')
  }

  addToActiveStreams(stream: any) {
    if (this.activeStreams.length <= 3) {
      for (let i of this.activeStreams) {
        if (i == stream) {
          console.log('You are already watching this stream')
          return false;
        }
      };
     this.msgService.startWatching({ viewer: localStorage.getItem('userId'), host: stream.host._id })
      this.activeStreams.push(stream)
    } else {
      console.log('Too many streams open')
    }
  }

  removeStream(i: number) {
    this.msgService.stopWatching({ viewer: localStorage.getItem('userId'), host: this.activeStreams[i].host._id })
    this.activeStreams.splice(i, 1);
  }

}