"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_service_1 = require("./../../services/auth.service");
var group_service_1 = require("./../../services/group.service");
var AddGroupComponent = (function () {
    function AddGroupComponent(authService, groupService) {
        this.authService = authService;
        this.groupService = groupService;
        this.user = new Object;
    }
    AddGroupComponent.prototype.addGroup = function () {
        var _this = this;
        var newGroup = {
            name: this.name,
            description: this.description
        };
        this.groupService.addGroups(newGroup)
            .subscribe(function (group) {
            _this.groups.push(group);
            _this.groupService.getGroupsForUser()
                .subscribe(function (groups) { return _this.groups = groups; });
        });
    };
    AddGroupComponent.prototype.deleteGroup = function (id, name) {
        var _this = this;
        //let groups = this.groups;
        this.groupService.deleteGroup(name)
            .subscribe(function (data) {
            if (data) {
                for (var i = 0; i < _this.groups.length; i++) {
                    if (_this.groups[i] == id) {
                        _this.groups.splice(i, 1);
                    }
                }
                _this.deleteGroupTransactions(name);
                _this.getGroupList();
            }
        });
    };
    AddGroupComponent.prototype.deleteGroupTransactions = function (name) {
        var _this = this;
        this.groupService.deleteGroupTransactions(name)
            .subscribe(function (transactions) { return _this.transactions = transactions; });
    };
    AddGroupComponent.prototype.getGroupList = function () {
        var _this = this;
        this.groupService.getGroupsForUser()
            .subscribe(function (groups) { return _this.groups = groups; });
    };
    AddGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.groupService.getGroupsForUser()
            .subscribe(function (groups) { return _this.groups = groups; });
        this.authService.getDashboard().subscribe(function (dashboard) {
            _this.user = dashboard.user;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    return AddGroupComponent;
}());
AddGroupComponent = __decorate([
    core_1.Component({
        selector: 'app-add-group',
        templateUrl: './add-group.component.html',
        styleUrls: ['./add-group.component.css'],
        providers: [auth_service_1.AuthService, group_service_1.GroupService]
    })
], AddGroupComponent);
exports.AddGroupComponent = AddGroupComponent;
