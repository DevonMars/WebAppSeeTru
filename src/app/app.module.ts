import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StreamsComponent } from './streams/streams.component';
import { StreamsListComponent } from './streams/streams-list/streams-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StreamsComponent,
    StreamsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
