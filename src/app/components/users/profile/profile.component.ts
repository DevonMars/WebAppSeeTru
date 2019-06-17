import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/user';
import { StreamService } from 'src/app/services/stream/stream.service';
import { MessageService } from 'src/app/services/message/message.service';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message';
import { SignService } from 'src/app/services/sign/sign.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  message : Message
  user: User
  messages: []
  private _msgSub : Subscription
  messagetxt : String
  disableButton = false

  constructor(
    private _userService : UserService,
    private _streamService : StreamService,
    private msgService : MessageService,
    private _sign : SignService
  ) { }

  ngOnInit() {
    //this.message.author = localStorage.getItem('userId');
    this._userService.single(localStorage.getItem('userId'))
    .subscribe(
      res => {
        this.user = res
        this.messages = this.user.messages
        console.log(this.messages)
      },
      err => {
        console.log(err)
      }
    ),
    this.getMessages();
    this._msgSub = this.msgService.messages.subscribe(() => {
      this.getMessages();
    });
  }

  getMessages() {
    this._streamService.getMessages(localStorage.getItem('userId')).subscribe(
      res => {
        this.messages = res;
        console.log(this.messages)
        //this.autoScroll();
      }
    );
  }

  // autoScroll() {
  //   $(".scrollfield.chatbox").stop().animate({ scrollTop: $(".scrollfield.chatbox")[0].scrollHeight}, 1000);
  // }

}
