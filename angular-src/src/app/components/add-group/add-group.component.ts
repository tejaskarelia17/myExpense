import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { GroupService } from './../../services/group.service';
import { GroupSchema } from './../../services/groupSchema';
import { TransactionSchema } from './../../services/transactionSchema';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
  providers: [AuthService, GroupService]
})
export class AddGroupComponent implements OnInit {

  //@Input user: any;
  user: Object;
  transactions: TransactionSchema[];
  transaction: TransactionSchema;
  groups: GroupSchema[];
  group: GroupSchema;
  name : String;
  description: String;
  user_id: String;

  constructor(
    private authService: AuthService,
    private groupService: GroupService
  ) {
    this.user = new Object;
  }

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

  deleteGroup(id:any, name:any){
    //let groups = this.groups;
    this.groupService.deleteGroup(name)
      .subscribe(data => {
        if(data){
          for(var i = 0; i < this.groups.length; i++) {
            if(this.groups[i] == id){
              this.groups.splice(i,1);
            }
          }
          this.deleteGroupTransactions(name);
          this.getGroupList();
        }
      })
  }

  deleteGroupTransactions(name:any){
    this.groupService.deleteGroupTransactions(name)
      .subscribe(transactions => this.transactions = transactions );
  }

  getGroupList(){
    this.groupService.getGroupsForUser()
      .subscribe(groups => this.groups = groups);
  }

  ngOnInit() {
    this.groupService.getGroupsForUser()
      .subscribe(groups => this.groups = groups);
    this.authService.getDashboard().subscribe(dashboard => {
        this.user = dashboard.user;
      },
      err => {
        console.log(err);
        return false;
      });
  }

}
