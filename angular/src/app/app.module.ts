import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { RequestAppointmentComponent } from './request-appointment/request-appointment.component';
import {NgTempusdominusBootstrapModule} from "ngx-tempusdominus-bootstrap";
import { AppointmentListAdminComponent } from './appointment-list-admin/appointment-list-admin.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'appointments', component: AppointmentListComponent},
  { path: 'appointments/addappointment', component: RequestAppointmentComponent},
  { path: 'users/:id', component: AppointmentListAdminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    UsersComponent,
    AppointmentListComponent,
    AppointmentComponent,
    HomeComponent,
    RequestAppointmentComponent,
    AppointmentListAdminComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}),
    NgTempusdominusBootstrapModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
