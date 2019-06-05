import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../../../../_model/instance/utils/transaction/Transaction";
import {Player} from "../../../../../_model/instance/Player";
import {Transferable} from "../../../../../_model/instance/interfaces/Transferable";
import {Money} from "../../../../../_model/instance/properties/transferable/Money";

@Component({
  selector: 'app-transaction-remove',
  templateUrl: './transaction-remove.component.html',
  styleUrls: ['./transaction-remove.component.css']
})
export class TransactionRemoveComponent implements OnInit {

  @Input() transaction: Transaction;
  @Input() side: Player;

  constructor() { }

  ngOnInit() {
  }

  getOffer(): Transferable[] {
    return this.transaction.getOffer(this.side).toArray()
        .filter(p => !(p instanceof Money));
  }

}
