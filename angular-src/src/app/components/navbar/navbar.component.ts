import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { GroupService } from './../../services/group.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {GroupSchema} from "../../services/groupSchema";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() user: Object;
 // user: Object;
  groups: GroupSchema[];
  group: GroupSchema;
  groupname: String;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private groupService: GroupService,
    private router: Router
  ) {
    this.groupService.getGroupsForUser()
      .subscribe(groups => this.groups = groups);
  }

  ngOnInit() {
    this.groupService.getGroupsForUser()
      .subscribe(groups => this.groups = groups);
  }

  getGroupsTransaction(groupname: any){
    const group_name = this.groupname;
  }

  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/login']);
    this.flashMessage.show('' , { cssClass: 'alert-danger', timeout: 3000 });
    return false;
  }
}

