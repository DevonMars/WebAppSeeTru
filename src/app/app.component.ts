import {Component, OnInit} from '@angular/core';
import { StreamService } from './services/stream/stream.service';
import {SignService} from './services/sign/sign.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'The Circle';

  constructor(private _sign: SignService) { }

  ngOnInit() {
    this._sign.generateKey()
      .subscribe(key => {
        this._sign.client_private_key = key.privateKey;
        this._sign.client_public_key = key.publicKey;
        console.log({
          pr: this._sign.client_private_key,
          pb: this._sign.client_public_key
        });
      });
  }
}
