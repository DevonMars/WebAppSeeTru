import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamComponent } from './components/streaming/stream/stream.component';
import { LoginComponent } from './components/authentication/login/login.component'
import { AuthGuard } from './services/auth/auth-guard';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { ProfileComponent } from './components/users/profile/profile.component';

const routes: Routes = [
  {
    path:'',
    component: StreamComponent, 
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'stream',
    component: StreamComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'transparants',
    component: UserIndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
