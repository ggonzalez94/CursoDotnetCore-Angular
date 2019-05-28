import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/Alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authservice: AuthService, private alertifyservice: AlertifyService) { }

  ngOnInit() {
  }
  login() {
    this.authservice.login(this.model).subscribe(next => {
      this.alertifyservice.success('Logged in succesfully');
    }, error => {
      this.alertifyservice.error(error);
    })
  }

  loggedIn(){
    return this.authservice.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertifyservice.message('logged out');
  }

}
