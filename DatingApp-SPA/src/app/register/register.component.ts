import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/Alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authservice: AuthService, private alertifyservice: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    this.authservice.register(this.model).subscribe(() => {
      this.alertifyservice.success('registration succesful');
      }, error => {
        this.alertifyservice.error(error);
      })
  }
  
  cancel(){
    this.cancelRegister.emit(false);
  }

}
