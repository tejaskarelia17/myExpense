import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../services/transaction.service';
import { TransactionSchema } from './../../services/transactionSchema';
import { AuthService } from './../../services/auth.service';
import { GroupService } from './../../services/group.service';
import { GroupSchema } from './../../services/groupSchema';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css'],
  providers: [TransactionService, AuthService, GroupService]
})
export class AddBillComponent implements OnInit {

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
  ) { }

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
        this.transactionService.getTransactionsForUser()
          .subscribe(transactions => this.transactions = transactions);
      })
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
