import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.styl']
})
export class UserIndexComponent implements OnInit {

  users = []
  selectedStreamer : User


  constructor(
    private _userService : UserService,
  ) { }

  ngOnInit() {
    this._userService.list()
    .subscribe(
      res => {
        this.users = res
      },
      err => {
        console.log(err)
      }
    )
  }

  onSelectStreamer(streamer : User) : void {
    this.selectedStreamer = streamer  
  }

}
