import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { GroupService } from './../../services/group.service';
import { GroupSchema } from './../../services/groupSchema';
import { TransactionSchema } from './../../services/transactionSchema';

import { DashboardService } from './../../services/dashboard.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
  providers: [AuthService, GroupService,DashboardService]
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
  totalAmount: Number;
  monthAndYear:String;

  constructor(
    private authService: AuthService,
    private groupService: GroupService,
  private dashboardService: DashboardService
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

  budgetCross(){
    if(this.totalAmount > 1000){
      return true
    } else return false
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
    this.dashboardService.getTransactionsTotalForUser()
      .subscribe(data => {
        if(data.length === 0 )
        {
          this.totalAmount = 0;
          this.monthAndYear = "No transactions for this month!"
        } else {
          this.totalAmount = data[0].totalPrice;
          if(data[0]._id == 12){
            this.monthAndYear = "December 2017"
          }
        }
      });
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
