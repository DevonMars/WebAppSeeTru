import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  loginUserData : FormGroup;
  submitResult = ' ';

  constructor(private _auth: AuthService, private _router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginUserData = this.fb.group({
      name: [ '', [
        Validators.required
      ]],
      password: [ '', [
        Validators.required
      ]]
    })
  }

  loginUser() {
    console.log(this.loginUserData);
    this._auth.loginUser(this.loginUserData.value)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['/home'])
        this.submitResult = 'Welkom bij Zippi Web-beheer';
      },
      err => {
        //this.submitResult = err.error.Error;
        console.log(err)
      }
    )
  }

  get name() {
    return this.loginUserData.get('name');
  }

  get password() {
    return this.loginUserData.get('password');
  }

  validateName() {
    return this.name.hasError('required') ? 'Voer een naam in' : '';
        
  }

  validatePassword() {
    return this.password.hasError('required') ? 'Voer een wachtwoord in' : '';
  }

}