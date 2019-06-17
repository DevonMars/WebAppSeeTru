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
    //this._viewSub.unsubscribe();
    console.log('NIET VERGETEN UNSUBSCRIBE TE FIXEN IN STREAM.COMPONENT.TS')
    for (let i = 0; i < this.activeStreams.length; i++) {
      this.msgService.stopWatching({ viewer: localStorage.getItem('userId'), host: this.activeStreams[i].host._id })
      console.log('stopped watching: ', i)
    }
  }

  addToActiveStreams(stream: any) {
    for (let i of this.activeStreams) {
      if (i == stream) {
        this.showResult('You are already watching this stream');
        console.log('You are already watching this stream')
        return false;
      }
    };
    if (this.activeStreams.length >= 4) {

      this.showResult('You can only watch 4 streams at a time');
      console.log('Too many streams open')
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
    console.log('nmber: ', i)
    this.msgService.stopWatching({ viewer: localStorage.getItem('userId'), host: this.activeStreams[i].host._id })
    this.activeStreams.splice(i, 1);
  }
}
