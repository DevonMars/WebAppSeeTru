import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StreamsListComponent} from './streams/streams-list/streams-list.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: StreamsListComponent },
  { path: '**', component: StreamsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
