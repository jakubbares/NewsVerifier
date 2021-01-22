import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SettingsComponent} from './settings/settings.component';
import {ProcessComponent} from "./components/process/process.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/analyze',
    pathMatch: 'full'
  },
  {
    path: 'admin/sign-in',
    component: SignInComponent
  },
  {
    path: 'admin/verify-email',
    component: SignInComponent
  },
  {
    path: 'analyze',
    component: ProcessComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
