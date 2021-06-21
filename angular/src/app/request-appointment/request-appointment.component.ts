import {Component, OnInit, ViewChild} from '@angular/core';
import {Appointment} from "../appointment/appointment.model";
import {AppointmentService} from "../appointment/appointment.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-request-appointment',
  templateUrl: './request-appointment.component.html',
  styleUrls: ['./request-appointment.component.css']
})
export class RequestAppointmentComponent implements OnInit {
  appointmentList: Appointment[];
  username: string;
  form: any = {};
  @ViewChild('f')
  f: NgForm;
  constructor(private appointmentService: AppointmentService, private router: Router, private authService: AuthService, private token: TokenStorageService) { }

  ngOnInit() {
    this.getAppointments();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/appointments/addappointment']);
    } else {
      this.router.navigate(['/home']);
    }
    this.username = this.token.getUsername();
  }

  getAppointments(): void {
    this.appointmentService.getAppointments()
      .subscribe(appointmentList => this.appointmentList = appointmentList);
  }

  add(date: string, time: string, address: string): void {
    let username = '';
    date = date.trim();
    time = time.trim();
    address = address.trim();
    username = this.username;
    let accepted = false;
    let paid = false;
    this.appointmentService.addAppointment({ date, time, address, username, accepted, paid } as Appointment)
      .subscribe(appointment => { this.appointmentList.push(appointment); },
        error => { }
      );
    this.f.reset();
    this.f.reset();
    this.f.reset();
    this.router.navigate(['/appointments']);
  }
}
