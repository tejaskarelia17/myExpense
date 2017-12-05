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
var sweetalert2_1 = require("sweetalert2");
var TransactionComponent = (function () {
    function TransactionComponent(transactionService, authService, groupService) {
        this.transactionService = transactionService;
        this.authService = authService;
        this.groupService = groupService;
        this.user = new Object;
    }
    TransactionComponent.prototype.addTransaction = function () {
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
            // this.transactionService.getTransactionsForUser()
            //   .subscribe(transactions => this.transactions = transactions);
            _this.getList();
        });
    };
    TransactionComponent.prototype.deleteTransaction = function (id) {
        var _this = this;
        this.transactionService.deleteTransaction(id)
            .subscribe(function (data) {
            if (data) {
                for (var i = 0; i < _this.transactions.length; i++) {
                    if (_this.transactions[i] == id) {
                        _this.transactions.splice(i, 1);
                    }
                }
                _this.getList();
            }
        });
    };
    TransactionComponent.prototype.updateTransactions = function (id) {
        var _this = this;
        this.transactionService.getTransactionsForID(id)
            .subscribe(function (transaction) {
            //transaction = this.updateTransaction;
            _this.updateTransaction = transaction;
            _this.transactionService.updateTransactions(_this.updateTransaction).subscribe(function (data) {
                _this.getList();
            });
        });
    };
    TransactionComponent.prototype.deleteTransactionAlert = function (id) {
        var _this = this;
        sweetalert2_1.default({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function (result) {
            if (result.value) {
                sweetalert2_1.default('Deleted!', 'Your Expense has been deleted.', 'success');
                //this.deleteTransaction(id);
                _this.updateTransactions(id);
            }
            else if (result.dismiss === 'cancel') {
                sweetalert2_1.default('Cancelled', 'Your Expense is safe :)', 'error');
            }
            else if (result.dismiss === 'overlay') {
            }
        });
    };
    TransactionComponent.prototype.getList = function () {
        var _this = this;
        this.transactionService.getTransactionsForUser()
            .subscribe(function (transactions) { return _this.transactions = transactions; });
    };
    TransactionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.transactionService.getTransactionsForUser()
            .subscribe(function (transactions) { return _this.transactions = transactions; });
        this.groupService.getGroupsForUser()
            .subscribe(function (groups) { return _this.groups = groups; });
        this.authService.getDashboard().subscribe(function (dashboard) {
            _this.user = dashboard.user;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    return TransactionComponent;
}());
TransactionComponent = __decorate([
    core_1.Component({
        selector: 'app-transaction',
        templateUrl: './transaction.component.html',
        styleUrls: ['./transaction.component.css'],
        providers: [transaction_service_1.TransactionService, auth_service_1.AuthService, group_service_1.GroupService]
    })
], TransactionComponent);
exports.TransactionComponent = TransactionComponent;
