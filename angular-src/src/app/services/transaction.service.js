"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var TransactionService = (function () {
    function TransactionService(http) {
        this.http = http;
    }
    //Retreive Transactions
    // getTransactions(){
    //   return this.http.get('http://localhost:3000/transactions/transactions')
    //     .map(res => res.json());
    // }
    TransactionService.prototype.getTransactionsForUser = function () {
        this.loadUserId();
        var userId = this.user_id;
        return this.http.get('http://localhost:3000/transactions/transactions/' + userId)
            .map(function (res) { return res.json(); });
    };
    //Add Transactions
    TransactionService.prototype.addTransactions = function (newTransaction) {
        this.loadUserId();
        newTransaction.user_id = this.user_id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/transactions/addtransaction', newTransaction, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //Delete Transaction
    TransactionService.prototype.deleteTransaction = function (id) {
        return this.http.delete('http://localhost:3000/transactions/transaction/' + id)
            .map(function (res) { return res.json(); });
    };
    //Update Transaction
    TransactionService.prototype.getTransactionsForID = function (id) {
        console.log('Transaction ID: ' + id);
        return this.http.get('http://localhost:3000/transactions/trans/' + id)
            .map(function (res) { return res.json(); });
    };
    TransactionService.prototype.restoreTransactions = function (updateTransaction) {
        this.loadUserId();
        console.log(updateTransaction);
        updateTransaction.user_id = this.user_id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/transactions/restoretransaction/' + updateTransaction[0]._id, updateTransaction, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TransactionService.prototype.updateTransactions = function (updateTransaction) {
        this.loadUserId();
        console.log(updateTransaction);
        updateTransaction.user_id = this.user_id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/transactions/transaction/' + updateTransaction[0]._id, updateTransaction, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //Load UserID
    TransactionService.prototype.loadUserId = function () {
        var userIdFromStorage = localStorage.getItem('user_id');
        this.user_id = userIdFromStorage;
        return this.user_id;
    };
    //Get Transactions of a particular Group
    TransactionService.prototype.getTransactionsOfGroupsForUser = function (group_name) {
        this.loadUserId();
        var userId = this.user_id;
        return this.http.get('http://localhost:3000/transactions/listgrouptransaction/' + userId + '/' + group_name)
            .map(function (res) { return res.json(); });
    };
    TransactionService.prototype.getTransactionsForUserDeleted = function () {
        this.loadUserId();
        var userId = this.user_id;
        return this.http.get('http://localhost:3000/transactions/deleteTrans/' + userId)
            .map(function (res) { return res.json(); });
    };
    return TransactionService;
}());
TransactionService = __decorate([
    core_1.Injectable()
], TransactionService);
exports.TransactionService = TransactionService;
