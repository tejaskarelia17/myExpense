"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var DashboardService = (function () {
    function DashboardService(http) {
        this.http = http;
    }
    //Get Transactions
    DashboardService.prototype.getTransactionsForUser = function () {
        this.loadUserId();
        var userId = this.user_id;
        return this.http.get('http://localhost:3000/dashboard/transactions/' + userId)
            .map(function (res) { return res.json(); });
    };
    //Transactions Total
    DashboardService.prototype.getTransactionsTotalForUser = function () {
        this.loadUserId();
        var userId = this.user_id;
        return this.http.get('http://localhost:3000/dashboard/transactionsTotal/' + userId)
            .map(function (res) { return res.json(); });
    };
    //PieChart
    DashboardService.prototype.getPieChart = function () {
        this.loadUserId();
        var userId = this.user_id;
        return this.http.get('http://localhost:3000/dashboard/pieChart/' + userId)
            .map(function (res) { return res.json(); });
    };
    //BarChart
    DashboardService.prototype.getBarChart = function () {
        this.loadUserId();
        var userId = this.user_id;
        return this.http.get('http://localhost:3000/dashboard/barChart/' + userId)
            .map(function (res) { return res.json(); });
    };
    //Load UserID
    DashboardService.prototype.loadUserId = function () {
        var userIdFromStorage = localStorage.getItem('user_id');
        this.user_id = userIdFromStorage;
        return this.user_id;
    };
    return DashboardService;
}());
DashboardService = __decorate([
    core_1.Injectable()
], DashboardService);
exports.DashboardService = DashboardService;
