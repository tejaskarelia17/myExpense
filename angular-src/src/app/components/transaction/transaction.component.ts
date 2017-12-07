import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from './../../services/transaction.service';
import { TransactionSchema } from './../../services/transactionSchema';
import { AuthService } from './../../services/auth.service';
import { GroupService } from './../../services/group.service';
import { GroupSchema } from './../../services/groupSchema';
import swal from 'sweetalert2';
import { DashboardService } from './../../services/dashboard.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [TransactionService, AuthService, GroupService, DashboardService]
})
export class TransactionComponent implements OnInit {
  //@Input() user: Object;
  user: Object;
  groups: GroupSchema[];
  group: GroupSchema;
  transactions: TransactionSchema[];
  transaction: TransactionSchema;
  selectedGroup: String;
  name : String;
  description: String;
  amount: Number;
  updateTransaction: Object;
  totalAmount: Number;
  monthAndYear:String;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private groupService: GroupService,
    private dashboardService: DashboardService
  ) {
    this.user = new Object;
  }

  budgetCross(){
    if(this.totalAmount > 1000){
      return true
    } else return false
  }

  addTransaction(){
    const newTransaction = {
      name: this.name,
      description: this.description,
      amount: this.amount,
      group_name: this.selectedGroup
    };
    this.transactionService.addTransactions(newTransaction)
      .subscribe(transaction => {
        this.transactions.push(transaction);
        // this.transactionService.getTransactionsForUser()
        //   .subscribe(transactions => this.transactions = transactions);
        this.getList();
    })
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

  updateTransactions(id:any){
    this.transactionService.getTransactionsForID(id)
      .subscribe(transaction => {
        //transaction = this.updateTransaction;
        this.updateTransaction = transaction;
        this.transactionService.updateTransactions(this.updateTransaction).subscribe(data => {
          this.getList();
        });
      });
  }

  deleteTransactionAlert(id: any) {
    swal({
      title: 'Are you sure?',
      text: 'This transaction can be found in the Trash!',
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
       //this.deleteTransaction(id);
        this.updateTransactions(id);
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
    this.transactionService.getTransactionsForUser()
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

    this.transactionService.getTransactionsForUser()
      .subscribe(transactions => this.transactions = transactions);

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
