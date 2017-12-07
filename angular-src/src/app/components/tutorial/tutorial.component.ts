import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  user: Object;
  selectedGroup: String;
  name : String;
  description: String;
  amount: Number;
  totalAmount: Number;
  monthAndYear: String;
  PieData: any;
  BarData: any;
  rootNode: any;
  show: Boolean;
  counter: Number;
  constructor() {
    this.user = new Object;
  }

  ngOnInit() {
  }

}
