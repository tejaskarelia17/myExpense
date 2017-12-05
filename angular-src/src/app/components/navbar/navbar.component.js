"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NavbarComponent = (function () {
    function NavbarComponent(authService, flashMessage, groupService, router) {
        var _this = this;
        this.authService = authService;
        this.flashMessage = flashMessage;
        this.groupService = groupService;
        this.router = router;
        this.groupService.getGroupsForUser()
            .subscribe(function (groups) { return _this.groups = groups; });
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.groupService.getGroupsForUser()
            .subscribe(function (groups) { return _this.groups = groups; });
    };
    NavbarComponent.prototype.getGroupsTransaction = function (groupname) {
        var group_name = this.groupname;
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.flashMessage.show('', { cssClass: 'alert-danger', timeout: 3000 });
        return false;
    };
    return NavbarComponent;
}());
__decorate([
    core_1.Input()
], NavbarComponent.prototype, "user", void 0);
NavbarComponent = __decorate([
    core_1.Component({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.css']
    })
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
