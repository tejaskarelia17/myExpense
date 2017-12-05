"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RegisterComponent = (function () {
    function RegisterComponent(validateService, authService, flashMessage, router) {
        this.validateService = validateService;
        this.authService = authService;
        this.flashMessage = flashMessage;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password,
            cpassword: this.cpassword
        };
        if (!this.validateService.validateRegister(user)) {
            this.flashMessage.show('Please Fill!', { cssClass: 'alert-warning', timeout: 3000 });
            return false;
        }
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show('Please Fill Email Correctly!', { cssClass: 'alert-warning', timeout: 3000 });
            return false;
        }
        if (!this.validateService.validatePassword(user.password, user.cpassword)) {
            this.flashMessage.show('Passwords Dont Match', { cssClass: 'alert-warning', timeout: 3000 });
            return false;
        }
        //Register User
        this.authService.registerUser(user).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show('You are now registered!', { cssClass: 'alert-success', timeout: 8000 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessage.show('Registration Failure! Please try again! ', { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/register']);
            }
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
