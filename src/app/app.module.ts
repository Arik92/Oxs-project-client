import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantAddComponent } from './tenant-add/tenant-add.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TenantCardComponent } from './tenant-card/tenant-card.component';
import { TenantEditComponent } from './tenant-edit/tenant-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    TenantListComponent,
    TenantAddComponent,
    NavbarComponent,
    SidebarComponent,
    TenantCardComponent,
    TenantEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
