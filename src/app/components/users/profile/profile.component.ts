import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  user: User

  constructor(
    private _userService : UserService
  ) { }

  ngOnInit() {
    //this.message.author = localStorage.getItem('userId');
    this._userService.single(localStorage.getItem('userId'))
    .subscribe(
      res => {
        this.user = res
        console.log(this.user)
      },
      err => {
        console.log(err)
      }
    )
  }

}
