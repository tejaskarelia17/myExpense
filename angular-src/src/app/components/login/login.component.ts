import { Component, OnInit } from '@angular/core';
import { ValidateService } from './../../services/validate.service';
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(
    private validateService : ValidateService,
    private authService : AuthService,
    private flashMessage : FlashMessagesService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  calltut(){
    setTimeout(
      swal({
        title: 'Tutorial',
        text: "Do you want to watch the tutorial?",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, Please!'
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/tutorial']);
        }
      }), 6000)
  }
  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    // if(!this.validateService.validateUsername(user.username)){
    //   this.flashMessage.show('Please Fill Username!', { cssClass: 'alert-warning', timeout: 3000 });
    //   return false;
    // }
    //
    // if(!this.validateService.validatePasswordAtLogin(user.password)){
    //   this.flashMessage.show('Please Fill Password!', { cssClass: 'alert-warning', timeout: 3000 });
    //   return false;
    // }

    //Register User
    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now registered!', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show(data.msg , { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }
    })
  }

}
