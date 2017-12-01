import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from './../../services/transaction.service';
import { TransactionSchema } from './../../services/transactionSchema';
import { AuthService } from './../../services/auth.service';
import { GroupService } from './../../services/group.service';
import { GroupSchema } from './../../services/groupSchema';
import swal from 'sweetalert2';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [TransactionService, AuthService, GroupService]
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


  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private groupService: GroupService
  ) {
    this.user = new Object;
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
    this.transactionService.getTransactionsForUser()
      .subscribe(transactions => this.transactions = transactions);
  }

  ngOnInit() {
    this.transactionService.getTransactionsForUser()
      .subscribe(transactions => this.transactions = transactions);

    this.groupService.getGroupsForUser()
      .subscribe(groups => this.groups = groups);

    this.authService.getDashboard().subscribe(dashboard => {
        this.user = dashboard.user;
        console.log(this.user);
      },
      err => {
        console.log(err);
        return false;
      });

  }
}
