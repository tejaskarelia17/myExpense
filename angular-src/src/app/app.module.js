"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var angular2_fusioncharts_1 = require("angular2-fusioncharts");
var app_component_1 = require("./app.component");
var navbar_component_1 = require("./components/navbar/navbar.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var home_component_1 = require("./components/home/home.component");
var login_component_1 = require("./components/login/login.component");
var register_component_1 = require("./components/register/register.component");
var profile_component_1 = require("./components/profile/profile.component");
var search_component_1 = require("./components/navbar/search/search.component");
var editprofile_component_1 = require("./components/editprofile/editprofile.component");
var transaction_component_1 = require("./components/transaction/transaction.component");
var validate_service_1 = require("./services/validate.service");
var dashboard_service_1 = require("./services/dashboard.service");
var auth_service_1 = require("./services/auth.service");
var group_service_1 = require("./services/group.service");
var angular2_flash_messages_1 = require("angular2-flash-messages");
var transaction_service_1 = require("./services/transaction.service");
var add_bill_component_1 = require("./components/add-bill/add-bill.component");
var add_group_component_1 = require("./components/add-group/add-group.component");
var grouptransaction_component_1 = require("./components/transaction/grouptransaction/grouptransaction.component");
var deleted_transaction_component_1 = require("./components/transaction/deleted-transaction/deleted-transaction.component");
var angular_datatables_1 = require("./../../node_modules/angular-datatables/dist/angular-datatables");
// Import FusionCharts library
var FusionCharts = require("fusioncharts");
// Import FusionCharts Charts module
var Charts = require("fusioncharts/fusioncharts.charts");
var appRoutes = [
    { path: '', component: login_component_1.LoginComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'editprofile', component: editprofile_component_1.EditprofileComponent },
    { path: 'transactions', component: transaction_component_1.TransactionComponent },
    { path: 'addbill', component: add_bill_component_1.AddBillComponent },
    { path: 'addgroup', component: add_group_component_1.AddGroupComponent },
    { path: 'grouptransaction/:group_name', component: grouptransaction_component_1.GrouptransactionComponent },
    { path: 'deletetransaction', component: deleted_transaction_component_1.DeletedTransactionComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            navbar_component_1.NavbarComponent,
            dashboard_component_1.DashboardComponent,
            home_component_1.HomeComponent,
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            profile_component_1.ProfileComponent,
            search_component_1.SearchComponent,
            editprofile_component_1.EditprofileComponent,
            transaction_component_1.TransactionComponent,
            add_bill_component_1.AddBillComponent,
            add_group_component_1.AddGroupComponent,
            grouptransaction_component_1.GrouptransactionComponent,
            deleted_transaction_component_1.DeletedTransactionComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot(appRoutes),
            angular2_flash_messages_1.FlashMessagesModule,
            angular_datatables_1.DataTablesModule,
            angular2_fusioncharts_1.FusionChartsModule.forRoot(FusionCharts, Charts)
        ],
        providers: [validate_service_1.ValidateService, auth_service_1.AuthService, transaction_service_1.TransactionService, group_service_1.GroupService, dashboard_service_1.DashboardService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
