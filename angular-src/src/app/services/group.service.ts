import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GroupSchema } from './groupSchema';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupService {
  user_id: String;

  constructor(
    private http: Http
  ) { }

  getGroupsForUser(){
    this.loadUserId();
    const userId = this.user_id;
    return this.http.get('http://localhost:3000/groups/listgroups/'+userId)
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
    if(confirm("Are you sure to delete "+id)){
      return this.http.delete('http://localhost:3000/transactions/transaction/'+id)
        .map(res => res.json());
    }
  }

  //Load UserID
  loadUserId(){
    const userIdFromStorage = localStorage.getItem('user_id');
    this.user_id = userIdFromStorage;
    return this.user_id;
  }

}
