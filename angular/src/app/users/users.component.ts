import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {Appointment} from "../appointment/appointment.model";
import {AppointmentService} from "../appointment/appointment.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {User} from "../user/user.model";
import * as _ from "lodash";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  appointmentList: Appointment[];
  userList: unknown[];
  username: string;
  id: number;
  constructor(private appointmentService: AppointmentService, private router: Router,
              private authService: AuthService, private token: TokenStorageService, private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    if (this.authService.isLoggedIn()) {
      if (this.authService.isAdmin()) {
        this.router.navigate(['/users']);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }
  filter(option: string): void {
    option = option.trim();
    console.log(option);
    let filteredUserList = _.filter(this.userList, {'surname': option});
    this.userList=filteredUserList;
    if(option=="") {
      this.getUsers();
    }
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(userList => this.userList = userList);
  }

  add(date: string, time: string, address: string): void {
    let username = '';
    date = date.trim();
    time = time.trim();
    address = address.trim();
    username = this.username;
    this.appointmentService.addAppointment({ date, time, address, username } as Appointment)
      .subscribe(appointment => { this.appointmentList.push(appointment); },
        error1 => {},
        () => {},
      );
  }

  delete(appointment: Appointment): void {
    this.appointmentList = this.appointmentList.filter(c => c !== appointment);
    this.appointmentService.deleteAppointment(appointment).subscribe();
  }

}
