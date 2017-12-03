import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../../services/transaction.service';
import { TransactionSchema } from './../../../services/transactionSchema';
import { AuthService } from './../../../services/auth.service';
import { GroupService } from './../../../services/group.service';
import { GroupSchema } from './../../../services/groupSchema';
import swal from 'sweetalert2';
import { ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-grouptransaction',
  templateUrl: './grouptransaction.component.html',
  styleUrls: ['./grouptransaction.component.css'],
  providers: [TransactionService, AuthService, GroupService]
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

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private groupService: GroupService,
    private route: ActivatedRoute
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
