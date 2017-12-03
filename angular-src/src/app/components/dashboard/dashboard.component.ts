import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { TransactionService } from './../../services/transaction.service';
import { TransactionSchema } from './../../services/transactionSchema';
import { GroupService } from './../../services/group.service';
import { DashboardService } from './../../services/dashboard.service';
import { GroupSchema } from './../../services/groupSchema';
import {isUndefined} from "util";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: Object;
  groups: GroupSchema[];
  group: GroupSchema;
  transactions: TransactionSchema[];
  transaction: TransactionSchema;
  selectedGroup: String;
  name : String;
  description: String;
  amount: Number;
  totalAmount: Number;
  monthAndYear: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private transactionService: TransactionService,
    private dashboardService: DashboardService
  ) {
    this.user = new Object;
  }

  ngOnInit() {
    this.dashboardService.getTransactionsTotalForUser()
      .subscribe(data => {
        console.log(data);
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

    this.dashboardService.getTransactionsForUser()
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
