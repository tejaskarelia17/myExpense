import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../../services/transaction.service';
import { TransactionSchema } from './../../../services/transactionSchema';
import { AuthService } from './../../../services/auth.service';
import { GroupService } from './../../../services/group.service';
import { GroupSchema } from './../../../services/groupSchema';
import swal from 'sweetalert2';
import { ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-grouptransaction',
  templateUrl: './grouptransaction.component.html',
  styleUrls: ['./grouptransaction.component.css'],
  providers: [TransactionService, AuthService, GroupService]
})
export class GrouptransactionComponent implements OnInit {

  user: Object;
  groups: GroupSchema[];
  group: GroupSchema;
  transactions: TransactionSchema[];
  transaction: TransactionSchema;
  selectedGroup: String;
  name : String;
  description: String;
  group_name: String;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private groupService: GroupService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    let groupName = this.route.snapshot.params['group_name'];
    this.group_name = groupName;

    this.transactionService.getTransactionsOfGroupsForUser(this.group_name)
      .subscribe(transactions => this.transactions = transactions);
  }
}
