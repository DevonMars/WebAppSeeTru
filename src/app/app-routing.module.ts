import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamComponent } from './components/stream/stream.component';
import { LoginComponent } from './components/authentication/login/login.component'
import { AuthGuard } from './services/auth/auth-guard';

const routes: Routes = [
  {
    path:'',
    component: StreamComponent, canActivate: [AuthGuard]
  },
  {
    path:'login',
    component: LoginComponent
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
