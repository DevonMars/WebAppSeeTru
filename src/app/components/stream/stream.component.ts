import { Component, OnInit } from '@angular/core';
import { StreamService } from '../../services/stream/stream.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.styl']
})
export class StreamComponent implements OnInit {
  streams = [];
  activeStreams = [];
  messages = [];

  constructor(private _streamService: StreamService) { }

  ngOnInit() {
    return this._streamService.list()
      .subscribe(
        res => {
          this.streams = res
        },
        err => {
          console.log(err)
        }
      )
  }

  addToActiveStreams(stream: any) {
    if (this.activeStreams.length <= 3) {
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
