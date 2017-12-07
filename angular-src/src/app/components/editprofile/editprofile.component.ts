import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  providers: [AuthService]
})
export class EditprofileComponent implements OnInit {

  user: Object;
  name: String;
  username: String;
  email: String;
  setBudget: Number;
  budget:Number;
  budgetObject: Object;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  updateProfile(){
    const money = {
      setBudget: this.budget
    }
    console.log(money);

    this.authService.updateBudget(money).subscribe(data => {
      if(data.success){
        this.router.navigate(['/profile']);
      } else {
        this.router.navigate(['/editprofile']);
      }
    })
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(getEditProfile => {
        this.user = getEditProfile.user;
      },
      err => {
        console.log(err);
        return false;
      });
  }

}

