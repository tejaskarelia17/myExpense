import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../../services/transaction.service';
import { TransactionSchema } from './../../../services/transactionSchema';
import { AuthService } from './../../../services/auth.service';
import { GroupService } from './../../../services/group.service';
import { GroupSchema } from './../../../services/groupSchema';
import swal from 'sweetalert2';

@Component({
  selector: 'app-deleted-transaction',
  templateUrl: './deleted-transaction.component.html',
  styleUrls: ['./deleted-transaction.component.css'],
  providers: [TransactionService, AuthService, GroupService]
})
export class DeletedTransactionComponent implements OnInit {

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

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private groupService: GroupService
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
          this.getListofDeleted();
        }
      });
  }

  getListofDeleted(){
    this.transactionService.getTransactionsForUserDeleted()
      .subscribe(transactions => this.transactions = transactions);
  }

  restoreTransaction(id:any){
    this.transactionService.getTransactionsForID(id)
      .subscribe(transaction => {
        console.log(transaction);
        //transaction = this.updateTransaction;
        this.updateTransaction = transaction;
        this.transactionService.restoreTransactions(this.updateTransaction).subscribe(data => {
          this.getListofDeleted();
        });
      });
  }

  restoreTransactionAlert(id: any) {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to restore the transaction!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Please!',
      cancelButtonText: 'No, keep it in trash'
    }).then((result) => {
      if (result.value) {
        swal(
          'Restored!',
          'Your Expense has been restored.',
          'success'
        );
        //this.deleteTransaction(id);
        this.restoreTransaction(id);
      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your Expense is still in trash :)',
          'error'
        )
      } else if(result.dismiss === 'overlay'){

      }
    })
  }


  deleteTransactionAlert(id: any) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this expense!',
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

  ngOnInit() {
    this.transactionService.getTransactionsForUserDeleted()
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
