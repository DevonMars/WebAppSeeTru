import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignService } from 'src/app/services/sign/sign.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  loginUserData: FormGroup;
  submitResult = ' ';

  constructor(private _auth: AuthService,
              private _router: Router,
              private fb: FormBuilder,
              private _sign: SignService) { }

  ngOnInit() {
    this.loginUserData = this.fb.group({
      name: [ '', [
        Validators.required
      ]],
      password: [ '', [
        Validators.required
      ]]
    });
  }

  loginUser() {
    const loginRequest = {
      name: this.loginUserData.value.name,
      password: this.loginUserData.value.password,
      public_key: this._sign.client_public_key
    };
    this._auth.loginUser(loginRequest)
    .subscribe(
      res => {
        // console.log(res);

        // Set private key
        this._sign.decryptPrivateKey(res.private);
        this._sign.public_key = res.public;
        this._sign.certificate = res.cert;

        // const signature = this._sign.signMessage('test');
        // const verification = this._sign.verifySignature(signature);
        // // const encoded = this._sign.encodeToBase64(signature);
        // console.log(verification);
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('userId', res.userId);
        this._router.navigate(['/stream']);
      },
      err => {
        // this.submitResult = err.error.Error;
        console.log(err);
      }
    );
  }

  loginUserDev() {
    this._auth.loginUser({
      name: 'qwe',
      password: 'qwe',public_key: this._sign.client_public_key
    })
    .subscribe(
      res => {
        this._sign.decryptPrivateKey(res.private);
        this._sign.public_key = res.public;
        this._sign.certificate = res.cert;
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('userId', res.userId);
        this._router.navigate(['/stream']);
      },
      err => {
        console.log(err);
      }
    );
  }

  get name() {
    return this.loginUserData.get('name');
  }

  get password() {
    return this.loginUserData.get('password');
  }

  validateName() {
    return this.name.hasError('required') ? 'Username is required' : '';
  }

  validatePassword() {
    return this.password.hasError('required') ? 'Password is required' : '';
  }

}
