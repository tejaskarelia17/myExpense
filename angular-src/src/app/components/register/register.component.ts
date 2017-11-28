import { Component, OnInit } from '@angular/core';
import { ValidateService } from './../../services/validate.service';
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  cpassword: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      cpassword: this.cpassword
    }

    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please Fill!', { cssClass: 'alert-warning', timeout: 3000 });
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please Fill Email Correctly!', { cssClass: 'alert-warning', timeout: 3000 });
      return false;
    }

    if(!this.validateService.validatePassword(user.password, user.cpassword)){
      this.flashMessage.show('Passwords Dont Match', { cssClass: 'alert-warning', timeout: 3000 });
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are now registered!', { cssClass: 'alert-success', timeout: 8000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Registration Failure! Please try again! ', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    })
  }

}
