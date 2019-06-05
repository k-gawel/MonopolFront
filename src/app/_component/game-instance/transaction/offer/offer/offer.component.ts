import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../../../../_model/instance/utils/transaction/Transaction";
import {Player} from "../../../../../_model/instance/Player";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  @Input() transaction: Transaction;
  @Input() side: Player;
  add: boolean;


  constructor() { }

  ngOnInit() {
  }

}
