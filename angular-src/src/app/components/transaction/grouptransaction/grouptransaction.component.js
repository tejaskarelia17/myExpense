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
var GrouptransactionComponent = (function () {
    function GrouptransactionComponent(transactionService, authService, groupService, route) {
        this.transactionService = transactionService;
        this.authService = authService;
        this.groupService = groupService;
        this.route = route;
        this.user = new Object;
    }
    GrouptransactionComponent.prototype.deleteTransaction = function (id) {
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
    GrouptransactionComponent.prototype.deleteTransactionAlert = function (id) {
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
                _this.deleteTransaction(id);
            }
            else if (result.dismiss === 'cancel') {
                sweetalert2_1.default('Cancelled', 'Your Expense is safe :)', 'error');
            }
            else if (result.dismiss === 'overlay') {
            }
        });
    };
    GrouptransactionComponent.prototype.getList = function () {
        var _this = this;
        this.transactionService.getTransactionsOfGroupsForUser(this.group_name)
            .subscribe(function (transactions) { return _this.transactions = transactions; });
    };
    GrouptransactionComponent.prototype.ngOnInit = function () {
        var _this = this;
        var groupName = this.route.snapshot.params['group_name'];
        this.group_name = groupName;
        this.transactionService.getTransactionsOfGroupsForUser(this.group_name)
            .subscribe(function (transactions) { return _this.transactions = transactions; });
        this.authService.getDashboard().subscribe(function (dashboard) {
            _this.user = dashboard.user;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    return GrouptransactionComponent;
}());
GrouptransactionComponent = __decorate([
    core_1.Component({
        selector: 'app-grouptransaction',
        templateUrl: './grouptransaction.component.html',
        styleUrls: ['./grouptransaction.component.css'],
        providers: [transaction_service_1.TransactionService, auth_service_1.AuthService, group_service_1.GroupService]
    })
], GrouptransactionComponent);
exports.GrouptransactionComponent = GrouptransactionComponent;
