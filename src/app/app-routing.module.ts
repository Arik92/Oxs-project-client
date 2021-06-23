import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TenantAddComponent } from './tenant-add/tenant-add.component';
import { TenantEditComponent } from './tenant-edit/tenant-edit.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/:userName', component: DashboardComponent, children: [
  { path:'tenant-add', component: TenantAddComponent },
  { path:'tenant-edit', component: TenantEditComponent },
  { path:'tenant-list', component: TenantListComponent }
  ] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
