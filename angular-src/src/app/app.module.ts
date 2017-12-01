import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/navbar/search/search.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { TransactionComponent } from './components/transaction/transaction.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { GroupService } from './services/group.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { TransactionService } from './services/transaction.service';
import { AddBillComponent } from './components/add-bill/add-bill.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { GrouptransactionComponent } from './components/transaction/grouptransaction/grouptransaction.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'editprofile', component: EditprofileComponent},
  {path: 'transactions', component: TransactionComponent},
  {path: 'addbill', component: AddBillComponent},
  {path: 'addgroup', component: AddGroupComponent},
  {path: 'grouptransaction/:group_name', component: GrouptransactionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SearchComponent,
    EditprofileComponent,
    TransactionComponent,
    AddBillComponent,
    AddGroupComponent,
    GrouptransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService,AuthService,TransactionService,GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
