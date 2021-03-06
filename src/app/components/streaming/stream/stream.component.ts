import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { StreamService } from '../../../services/stream/stream.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';

@Injectable()

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.styl']
})
export class StreamComponent implements OnInit, OnDestroy {
  streams = [];
  activeStreams = [];
  messages = [];
  showAlert = false;
  activeAlert = false;
  private _viewSub: Subscription;
  viewAmount: Number;
  alertMsg = '';

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
    for (let i = 0; i < this.activeStreams.length; i++) {
      this.msgService.stopWatching({ viewer: localStorage.getItem('userId'), host: this.activeStreams[i].host._id, stream: this.activeStreams[i] })
      console.log('stopped watching: ', i)
    }
  }

  addToActiveStreams(stream: any) {
    for (let i of this.activeStreams) {
      if (i == stream) {
        this.showResult('You are already watching this stream');
        return false;
      }
    };
    if (this.activeStreams.length >= 4) {
      this.showResult('You can only watch 4 streams at a time');
    } else {
      this.msgService.startWatching({ viewer: localStorage.getItem('userId'), host: stream.host._id })
      this.activeStreams.push(stream)
    }
  }

  showResult(msg) {
    this.alertMsg = msg;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  removeStream(i: number) {
    this.msgService.stopWatching({ viewer: localStorage.getItem('userId'), host: this.activeStreams[i].host._id, stream: this.activeStreams[i] })
    this.activeStreams.splice(i, 1);
  }
}
