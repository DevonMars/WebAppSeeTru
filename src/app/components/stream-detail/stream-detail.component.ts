import { Component, OnInit, Input } from '@angular/core';
import { Stream } from '../../models/stream';
import { StreamService } from 'src/app/services/stream/stream.service';

@Component({
  selector: 'app-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.styl']
})
export class StreamDetailComponent implements OnInit {
  @Input() stream: Stream;
  messages = [];

  constructor(private _streamService: StreamService) { }

  ngOnInit() {
    console.log(this.stream)
    console.log(this.stream.host._id);
    this._streamService.getMessages(this.stream.host._id).subscribe(
      res => {
        console.log(res)
        this.messages = res
      }
    )
  }

}
