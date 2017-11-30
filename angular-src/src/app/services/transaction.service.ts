import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TransactionSchema } from './transactionSchema';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';

@Injectable()
export class TransactionService {
  user_id: String;

  constructor(
    private http: Http
  ) { }

  //Retreive Transactions
  // getTransactions(){
  //   return this.http.get('http://localhost:3000/transactions/transactions')
  //     .map(res => res.json());
  // }

  getTransactionsForUser(){
    this.loadUserId();
    const userId = this.user_id;
    return this.http.get('http://localhost:3000/transactions/transactions/'+userId)
      .map(res => res.json());
  }

  //Add Transactions
  addTransactions(newTransaction){
    this.loadUserId();
    newTransaction.user_id = this.user_id;
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/transactions/addtransaction', newTransaction, {headers: headers})
      .map(res => res.json());
  }

  //Delete Transaction
  deleteTransaction(id){
      return this.http.delete('http://localhost:3000/transactions/transaction/'+id)
        .map(res => res.json());
  }

  //Load UserID
  loadUserId(){
    const userIdFromStorage = localStorage.getItem('user_id');
    this.user_id = userIdFromStorage;
    return this.user_id;
  }

}
