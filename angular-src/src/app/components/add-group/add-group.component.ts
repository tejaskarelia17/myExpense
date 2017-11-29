import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { GroupService } from './../../services/group.service';
import { GroupSchema } from './../../services/groupSchema';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
  providers: [AuthService, GroupService]
})
export class AddGroupComponent implements OnInit {

  //@Input user: any;
  user: Object;
  groups: GroupSchema[];
  group: GroupSchema;
  name : String;
  description: String;
  user_id: String;

  constructor(
    private authService: AuthService,
    private groupService: GroupService
  ) { }

  addGroup(){
    const newGroup = {
      name: this.name,
      description: this.description
    };
    this.groupService.addGroups(newGroup)
      .subscribe(group => {
        this.groups.push(group);
        this.groupService.getGroupsForUser()
          .subscribe(groups => this.groups = groups);
      })
  }

  deleteGroup(id:any){
    let groups = this.groups;
    this.groupService.deleteGroup(id)
      .subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i < groups.length; i++) {
            if(groups[i] == id){
              groups.splice(i,1);
            }
          }
          this.getGroupList();
        }
      })
  }

  getGroupList(){
    this.groupService.getGroupsForUser()
      .subscribe(groups => this.groups = groups);
  }

  ngOnInit() {
    this.groupService.getGroupsForUser()
      .subscribe(groups => this.groups = groups);
  }

}
