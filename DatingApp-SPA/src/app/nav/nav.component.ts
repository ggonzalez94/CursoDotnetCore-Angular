import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/Alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authservice: AuthService, private alertifyservice: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authservice.login(this.model).subscribe(next => {
      this.alertifyservice.success('Logged in succesfully');
    }, error => {
      this.alertifyservice.error(error);
    }, () => {
        this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authservice.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertifyservice.message('logged out');
    this.router.navigate(['/home']);
  }

}
