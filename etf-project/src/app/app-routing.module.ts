import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PartyListComponentComponent } from './party-list-component/party-list-component.component';
import { PartyFormComponent } from './party-form/party-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'party-management', component: PartyListComponentComponent },
  { path: 'party-form', component: PartyFormComponent },
  { path: 'party-form/:id', component: PartyFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
