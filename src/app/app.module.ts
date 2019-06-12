import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StreamComponent } from './components/stream/stream.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';

import { StreamService } from './services/stream/stream.service';
import { MessageService } from './services/message/message.service';
import { StreamDetailComponent } from './components/stream-detail/stream-detail.component';

const config: SocketIoConfig = { url: 'http://thecirclebackend.herokuapp.com', options: {} };
//const config: SocketIoConfig = { url: 'localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    NavbarComponent,
    StreamDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [StreamService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
