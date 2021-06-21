import { Component, OnInit } from '@angular/core';
import {Appointment} from '../appointment/appointment.model';
import {AppointmentService} from '../appointment/appointment.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import * as _ from "lodash";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
  providers: [AppointmentService]
})
export class AppointmentListComponent implements OnInit {
  appointmentList: Appointment[];
  username: string;
  appointment: Observable<Appointment>;
  constructor(private appointmentService: AppointmentService, private router: Router, private authService: AuthService, private token: TokenStorageService) { }

  ngOnInit() {
    this.getAppointments();
    // @ts-ignore
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/appointments']);
    } else {
      this.router.navigate(['/home']);
    }
    this.username = this.token.getUsername();
  }

  getAppointments(): void {
    this.appointmentService.getAppointments()
      .subscribe(appointmentList => this.appointmentList = appointmentList);
  }

  update(id: number, date: string, time: string, address: string, username: string, accepted: boolean, receipt: number, paid: boolean): void {
    this.appointmentService.updateAppointment({id, date, time, address, username, accepted, receipt, paid} as unknown as Appointment).subscribe();
  }

  delete(appointment: Appointment): void {
    this.appointmentList = this.appointmentList.filter(c => c !== appointment);
    this.appointmentService.deleteAppointment(appointment).subscribe();
  }

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
}

