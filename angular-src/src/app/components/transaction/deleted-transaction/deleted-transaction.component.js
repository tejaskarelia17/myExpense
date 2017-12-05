"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var transaction_service_1 = require("./../../../services/transaction.service");
var auth_service_1 = require("./../../../services/auth.service");
var group_service_1 = require("./../../../services/group.service");
var sweetalert2_1 = require("sweetalert2");
var DeletedTransactionComponent = (function () {
    function DeletedTransactionComponent(transactionService, authService, groupService) {
        this.transactionService = transactionService;
        this.authService = authService;
        this.groupService = groupService;
        this.user = new Object;
    }
    DeletedTransactionComponent.prototype.deleteTransaction = function (id) {
        var _this = this;
        this.transactionService.deleteTransaction(id)
            .subscribe(function (data) {
            if (data) {
                for (var i = 0; i < _this.transactions.length; i++) {
                    if (_this.transactions[i] == id) {
                        _this.transactions.splice(i, 1);
                    }
                }
                _this.getListofDeleted();
            }
        });
    };
    DeletedTransactionComponent.prototype.getListofDeleted = function () {
        var _this = this;
        this.transactionService.getTransactionsForUserDeleted()
            .subscribe(function (transactions) { return _this.transactions = transactions; });
    };
    DeletedTransactionComponent.prototype.restoreTransaction = function (id) {
        var _this = this;
        this.transactionService.getTransactionsForID(id)
            .subscribe(function (transaction) {
            console.log(transaction);
            //transaction = this.updateTransaction;
            _this.updateTransaction = transaction;
            _this.transactionService.restoreTransactions(_this.updateTransaction).subscribe(function (data) {
                _this.getListofDeleted();
            });
        });
    };
    DeletedTransactionComponent.prototype.restoreTransactionAlert = function (id) {
        var _this = this;
        sweetalert2_1.default({
            title: 'Are you sure?',
            text: 'Do you want to restore the transaction!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Please!',
            cancelButtonText: 'No, keep it in trash'
        }).then(function (result) {
            if (result.value) {
                sweetalert2_1.default('Restored!', 'Your Expense has been restored.', 'success');
                //this.deleteTransaction(id);
                _this.restoreTransaction(id);
            }
            else if (result.dismiss === 'cancel') {
                sweetalert2_1.default('Cancelled', 'Your Expense is still in trash :)', 'error');
            }
            else if (result.dismiss === 'overlay') {
            }
        });
    };
    DeletedTransactionComponent.prototype.deleteTransactionAlert = function (id) {
        var _this = this;
        sweetalert2_1.default({
            title: 'Are you sure?',
            text: 'You will not be able to recover this expense!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function (result) {
            if (result.value) {
                sweetalert2_1.default('Deleted!', 'Your Expense has been deleted.', 'success');
                //this.deleteTransaction(id);
                _this.deleteTransaction(id);
            }
            else if (result.dismiss === 'cancel') {
                sweetalert2_1.default('Cancelled', 'Your Expense is safe :)', 'error');
            }
            else if (result.dismiss === 'overlay') {
            }
        });
    };
    DeletedTransactionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.transactionService.getTransactionsForUserDeleted()
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
    return DeletedTransactionComponent;
}());
DeletedTransactionComponent = __decorate([
    core_1.Component({
        selector: 'app-deleted-transaction',
        templateUrl: './deleted-transaction.component.html',
        styleUrls: ['./deleted-transaction.component.css'],
        providers: [transaction_service_1.TransactionService, auth_service_1.AuthService, group_service_1.GroupService]
    })
], DeletedTransactionComponent);
exports.DeletedTransactionComponent = DeletedTransactionComponent;
