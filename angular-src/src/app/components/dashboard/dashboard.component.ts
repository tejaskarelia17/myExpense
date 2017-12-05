import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { TransactionService } from './../../services/transaction.service';
import { TransactionSchema } from './../../services/transactionSchema';
import { GroupService } from './../../services/group.service';
import { DashboardService } from './../../services/dashboard.service';
import { GroupSchema } from './../../services/groupSchema';



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
  PieData: any;
  BarData: any;
  rootNode: any;

  dataSourcePieChart = {
    chart: {
      startingangle: '120',
      showlabels: '0',
      showlegend: '1',
      enablemultislicing: '0',
      slicingdistance: '15',
      showpercentvalues: '1',
      showpercentintooltip: '0',
      plottooltext: 'Group : $label | Total Expense : $datavalue',
      theme: 'ocean'
    },
    data: []
  };


  dataSourceBarChart = {
    chart: {
      "caption": "Monthly Expenditure",
      "xAxisName": "Month (12-Dec)",
      "yAxisName": "Expense",
      "numberPrefix": "$",
      "plottooltext": 'Month : $label | Total Expense : $datavalue',
      "theme": "ocean"
    },
    "data": []
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private transactionService: TransactionService,
    private dashboardService: DashboardService
  ) {
    this.user = new Object;
  }

  ngOnView
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

    this.dashboardService.getTransactionsForUser()
      .subscribe(transactions => this.transactions = transactions);

    this.dashboardService.getBarChart()
      .subscribe(data => {
        console.log(data);
        this.dataSourceBarChart.data = data;
      });

    this.dashboardService.getPieChart()
      .subscribe(data => {
        this.dataSourcePieChart.data = data;
      });

    this.authService.getDashboard().subscribe(dashboard => {
        this.user = dashboard.user;
      },
      err => {
        console.log(err);
        return false;
      });
  }

}
