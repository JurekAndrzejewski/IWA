import { Component, OnInit } from '@angular/core';
import {Appointment} from './appointment.model';
import {AppointmentService} from './appointment.service'
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  providers: [AppointmentService]
})
export class AppointmentComponent implements OnInit {

  appointment: Appointment;
  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getById();
  }

  getById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.appointmentService.getAppointment(Number(id))
      .subscribe(appointment => this.appointment = appointment);
  }

  update(id: number, date: string, time: string, address: string): void {
    this.appointmentService.updateAppointment({ id, date, time, address } as Appointment).subscribe();
  }

  delete(appointment: Appointment): void {
    this.appointmentService.deleteAppointment(appointment).subscribe();
  }
}
