import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginInfo} from './login-info';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {SignupInfo} from './signup-info';
import {TokenStorageService} from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({'COntent-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8081/restApi/auth/signin';
  private signupUrl = 'http://localhost:8081/restApi/auth/signup';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignupInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  isLoggedIn(): boolean {
    if(this.tokenStorageService.getToken()) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    if(this.tokenStorageService.getAuthorities()[0] == "ROLE_ADMIN") {
      return true;
    }
    return false;
  }
}
