import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SignService } from 'src/app/services/sign/sign.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.styl']
})
export class ChatComponent implements OnInit {
  private messages = [{author: 'jemoe', message: 'test'}];
  private message;
  private chatForm = new FormGroup({
    message: new FormControl('')
  });

  constructor(private _message: MessageService, private _sign: SignService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.message = {
      author: 'author',
      message: this.chatForm.value.message,
      signature: '',
    };
    this.messages.push(this.message);
    const hash = this._sign.digestMessage(this.chatForm.value.message);
    const signature = this._sign.signHash(hash);
    this.message.signature = signature;
  }

}
