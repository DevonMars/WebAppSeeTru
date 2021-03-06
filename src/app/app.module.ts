import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StreamComponent } from './components/streaming/stream/stream.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StreamService } from './services/stream/stream.service';
import { MessageService } from './services/message/message.service';
import { StreamDetailComponent } from './components/streaming/stream-detail/stream-detail.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth/auth-guard';
import { SignService } from './services/sign/sign.service';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import {DashjsPlayerModule} from 'angular-dashjs-player';

const config: SocketIoConfig = { url: 'http://thecirclebackend.herokuapp.com', options: {} };
// const config: SocketIoConfig = { url: 'localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    NavbarComponent,
    StreamDetailComponent,
    LoginComponent,
    RegisterComponent,
    UserIndexComponent,
    UserDetailComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxAutoScrollModule,
    DashjsPlayerModule
  ],
  providers: [StreamService, MessageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
