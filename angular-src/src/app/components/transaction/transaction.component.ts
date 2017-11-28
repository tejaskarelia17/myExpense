import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from './../../services/transaction.service';
import { TransactionSchema } from './../../services/transactionSchema';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [TransactionService, AuthService]
})
export class TransactionComponent implements OnInit {
  //@Input user: any;
  user: Object;

  transactions: TransactionSchema[];
  transaction: TransactionSchema;
  name : String;
  description: String;
  amount: Number;


  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) { }

  addTransaction(){
    const newTransaction = {
      name: this.name,
      description: this.description,
      amount: this.amount
    };
    this.transactionService.addTransactions(newTransaction)
      .subscribe(transaction => {
        this.transactions.push(transaction);
        this.transactionService.getTransactionsForUser()
          .subscribe(transactions => this.transactions = transactions);
    })
  }

  deleteTransaction(id:any){
    let transactions = this.transactions;
    this.transactionService.deleteTransaction(id)
      .subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i < transactions.length; i++) {
            if(transactions[i] == id){
              transactions.splice(i,1);
            }
          }
          this.getList();
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
