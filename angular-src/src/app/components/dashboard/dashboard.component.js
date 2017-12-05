"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DashboardComponent = (function () {
    function DashboardComponent(authService, router, transactionService, dashboardService, rootNode) {
        this.authService = authService;
        this.router = router;
        this.transactionService = transactionService;
        this.dashboardService = dashboardService;
        this.dataSourcePieChart = {
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
        this.dataSourceBarChart = {
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
        this.rootNode = rootNode;
        this.user = new Object;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dashboardService.getTransactionsTotalForUser()
            .subscribe(function (data) {
            if (data.length === 0) {
                _this.totalAmount = 0;
                _this.monthAndYear = "No transactions for this month!";
            }
            else {
                _this.totalAmount = data[0].totalPrice;
                if (data[0]._id == 12) {
                    _this.monthAndYear = "December 2017";
                }
            }
        });
        this.dashboardService.getTransactionsForUser()
            .subscribe(function (transactions) { return _this.transactions = transactions; });
        this.dashboardService.getBarChart()
            .subscribe(function (data) {
            console.log(data);
            _this.dataSourceBarChart.data = data;
        });
        this.dashboardService.getPieChart()
            .subscribe(function (data) {
            _this.dataSourcePieChart.data = data;
        });
        this.authService.getDashboard().subscribe(function (dashboard) {
            _this.user = dashboard.user;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
