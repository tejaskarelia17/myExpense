"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var transaction_service_1 = require("./../../services/transaction.service");
var auth_service_1 = require("./../../services/auth.service");
var group_service_1 = require("./../../services/group.service");
var AddBillComponent = (function () {
    function AddBillComponent(transactionService, authService, groupService) {
        this.transactionService = transactionService;
        this.authService = authService;
        this.groupService = groupService;
        this.user = new Object;
    }
    AddBillComponent.prototype.addTransaction = function () {
        var _this = this;
        var newTransaction = {
            name: this.name,
            description: this.description,
            amount: this.amount,
            group_name: this.selectedGroup
        };
        this.transactionService.addTransactions(newTransaction)
            .subscribe(function (transaction) {
            _this.transactions.push(transaction);
            _this.transactionService.getTransactionsForUser()
                .subscribe(function (transactions) { return _this.transactions = transactions; });
        });
    };
    AddBillComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.transactionService.getTransactionsForUser()
            .subscribe(function (transactions) { return _this.transactions = transactions; });
        this.groupService.getGroupsForUser()
            .subscribe(function (groups) { return _this.groups = groups; });
        this.authService.getDashboard().subscribe(function (dashboard) {
            _this.user = dashboard.user;
            console.log(_this.user);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    return AddBillComponent;
}());
AddBillComponent = __decorate([
    core_1.Component({
        selector: 'app-add-bill',
        templateUrl: './add-bill.component.html',
        styleUrls: ['./add-bill.component.css'],
        providers: [transaction_service_1.TransactionService, auth_service_1.AuthService, group_service_1.GroupService]
    })
], AddBillComponent);
exports.AddBillComponent = AddBillComponent;
