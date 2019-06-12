import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamComponent } from './components/stream/stream.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';

const routes: Routes = [
  {
    path:'',
    component: NavbarComponent
  },
  {
    path:'*',
    component: NavbarComponent
  },
  {
    path:'login',
    component: NavbarComponent
  },
  {
    path:'stream',
    component: StreamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
