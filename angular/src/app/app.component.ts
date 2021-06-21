import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'doctors and patients';
  info: any;
  private roles: string[];
  public authority: string;
  showUserMenu = false;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthorities()
    };
  }
  toggleUserMenu(): boolean {
    this.showUserMenu = !this.showUserMenu;
    return false;
  }
  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
  isAdmin(): boolean {
    if(this.info.authorities =='ROLE_ADMIN') { return true; }
    return false;
  }
}
