import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.styl']
})
export class UserDetailComponent implements OnInit {

  @Input() detailedUser : any
  streamer : User
  messages : []
  activities : []

  constructor(
    private _userService : UserService
  ) { }

  ngOnInit() {
    return this._userService.single(this.detailedUser)
    .subscribe(
      res => {
        this.streamer = res
        this.messages = this.streamer.messages
        this.activities = this.streamer.activities
      },
      err => {
        console.log(err)
      }
    )
  }

}