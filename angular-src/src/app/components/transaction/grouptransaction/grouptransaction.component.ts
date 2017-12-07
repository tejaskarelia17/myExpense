import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../../services/transaction.service';
import { TransactionSchema } from './../../../services/transactionSchema';
import { AuthService } from './../../../services/auth.service';
import { GroupService } from './../../../services/group.service';
import { GroupSchema } from './../../../services/groupSchema';
import swal from 'sweetalert2';
import { ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { DashboardService } from './../../../services/dashboard.service';

@Component({
  selector: 'app-grouptransaction',
  templateUrl: './grouptransaction.component.html',
  styleUrls: ['./grouptransaction.component.css'],
  providers: [TransactionService, AuthService, GroupService,DashboardService]
})
export class GrouptransactionComponent implements OnInit {

  user: Object;
  groups: GroupSchema[];
  group: GroupSchema;
  transactions: TransactionSchema[];
  transaction: TransactionSchema;
  selectedGroup: String;
  name : String;
  description: String;
  group_name: String;
  totalAmount: Number;
  monthAndYear:String;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {
    this.user = new Object;
  }

  deleteTransaction(id:any){
    this.transactionService.deleteTransaction(id)
      .subscribe(data => {
        if(data){
          for(var i = 0; i < this.transactions.length; i++) {
            if(this.transactions[i] == id){
              this.transactions.splice(i,1);
            }
          }
          this.getList();
        }
      });
  }

  budgetCross(){
    if(this.totalAmount > 1000){
      return true
    } else return false
  }

  deleteTransactionAlert(id: any) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          'Your Expense has been deleted.',
          'success'
        );
        this.deleteTransaction(id);
      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your Expense is safe :)',
          'error'
        )
      } else if(result.dismiss === 'overlay'){

      }
    })
  }

  getList(){
    this.transactionService.getTransactionsOfGroupsForUser(this.group_name)
      .subscribe(transactions => this.transactions = transactions);
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
    let groupName = this.route.snapshot.params['group_name'];
    this.group_name = groupName;

    this.transactionService.getTransactionsOfGroupsForUser(this.group_name)
      .subscribe(transactions => this.transactions = transactions);

    this.authService.getDashboard().subscribe(dashboard => {
        this.user = dashboard.user;
      },
      err => {
        console.log(err);
        return false;
      });
  }
}
