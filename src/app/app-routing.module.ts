import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamComponent } from './components/stream/stream.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '*',
    component: LoginComponent
  },
  {
    path: 'stream',
    component: StreamComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
