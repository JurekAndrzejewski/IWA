import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {User} from './user.model';
import { catchError, tap } from 'rxjs/operators';
import {Appointment} from "../appointment/appointment.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private adminUrl = 'http://localhost:8081/restApi/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.adminUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.adminUrl+"/"+id);
  }
}
