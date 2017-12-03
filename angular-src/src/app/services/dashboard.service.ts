import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {
  user_id: String;

  constructor(
    private http: Http
  ) { }

  //Get Transactions
  getTransactionsForUser(){
    this.loadUserId();
    const userId = this.user_id;
    return this.http.get('http://localhost:3000/dashboard/transactions/'+userId)
      .map(res => res.json());
  }

  //Transactions Total
  getTransactionsTotalForUser(){
    this.loadUserId();
    const userId = this.user_id;
    return this.http.get('http://localhost:3000/dashboard/transactionsTotal/'+userId)
      .map(res => res.json());
  }

  //Load UserID
  loadUserId(){
    const userIdFromStorage = localStorage.getItem('user_id');
    this.user_id = userIdFromStorage;
    return this.user_id;
  }

}
