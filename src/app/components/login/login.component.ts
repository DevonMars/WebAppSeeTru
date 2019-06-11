import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(public AuthService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value.name);
    this.AuthService.loginUser(form.value.name, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
