import {Component, OnInit, ViewChild} from '@angular/core';
import {AppointmentService} from "../appointment/appointment.service";
import {Appointment} from "../appointment/appointment.model";
import {User} from "../user/user.model";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";
import {Router, RouterModule} from "@angular/router";
import {NgForm} from "@angular/forms";
import * as _ from 'lodash';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-appointment-list-admin',
  templateUrl: './appointment-list-admin.component.html',
  styleUrls: ['./appointment-list-admin.component.css']
})
export class AppointmentListAdminComponent implements OnInit {
  appointmentList: unknown[];
  user: Observable<User>;
  href: string;
  id: number;
  form: any = {};
  username: string;
  @ViewChild('f')
  f: NgForm;
  constructor(private appointmentService: AppointmentService, private userService: UserService, private router: Router, private authService: AuthService) { }

  sort(option: string): void {
    let idAsc = _.orderBy(this.appointmentList, ['id'], ['asc']);
    let idDesc = _.orderBy(this.appointmentList, ['id'], ['desc']);
    let dateAsc = _.orderBy(this.appointmentList, ['date'], ['asc']);
    let dateDesc = _.orderBy(this.appointmentList, ['date'], ['desc']);
    if(option=="idAsc") {
      this.appointmentList=idAsc;
    } else if(option=="idDesc") {
      this.appointmentList=idDesc;
    } else if(option=="dateAsc") {
      this.appointmentList=dateAsc;
    } else if(option=="dateDesc") {
      this.appointmentList=dateDesc;
    }
  }
  filter(option: string): void {
    option = option.trim();
    console.log(option);
    let filteredAppointmentList = _.filter(this.appointmentList, {'address': option});
    this.appointmentList=filteredAppointmentList;
    if(option=="") {
      this.getAppointments();
    }
  }
  ngOnInit(): void {
    this.getAppointments();
    this.user = this.getUser();
    if (this.authService.isLoggedIn()) {
      if (!this.authService.isAdmin()) {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/home']);
    }

  }

  getAppointments(): void {
    this.href = this.router.url;
    let id = parseInt(this.href.replace(/\D/g, ""));
    this.appointmentService.getAllAppointments(id)
      .subscribe(appointmentList => this.appointmentList = appointmentList);
    this.userService.getUser(id).subscribe(val =>this.username=val.username);
  }

  getUser(): Observable<User> {
    this.href = this.router.url;
    let id = parseInt(this.href.replace(/\D/g, ""));
    return this.userService.getUser(id);
  }

  delete(appointment: Appointment): void {
    this.appointmentList = this.appointmentList.filter(c => c !== appointment);
    this.appointmentService.deleteAppointment(appointment).subscribe();
  }

  update(id: number, date: string, time: string, address: string, username: string, accepted: boolean, receipt: number, paid: boolean): void {
    this.appointmentService.updateAppointment({id, date, time, address, username, accepted, receipt, paid} as unknown as Appointment).subscribe();
  }
  add(date: string, time: string, address: string): void {
    date = date.trim();
    time = time.trim();
    address = address.trim();
    let accepted = true;
    let paid = false;
    let username = this.username;
    this.appointmentService.addAppointment({date, time, address, username, accepted, paid} as Appointment)
      .subscribe(appointment => {
          this.appointmentList.push(appointment);
        },
        error => {
        }
      );
    this.f.reset();
    this.f.reset();
    this.f.reset();
    this.router.navigate(['/users']);
  }
}
