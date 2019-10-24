import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  BankTransaction,
  CompulsoryTransaction,
  Transaction
} from "../../../../../_model/instance/utils/transaction/Transaction";
import {Bank, Player} from "../../../../../_model/instance/Player";
import {SessionService} from "../../../../../_service/utils/cookies/session-service";

@Component({
  selector: 'app-first-row',
  templateUrl: './first-row.component.html',
  styleUrls: ['./first-row.component.css']
})
export class FirstRowComponent implements OnInit {

  @Input() transaction: Transaction;
  @Input() side: Player;
  @Output() add = new EventEmitter<boolean>(false);
  _add: boolean = false;

  isBankTransaction: boolean;
  isBank: boolean;

  moneyAmount: number;

  constructor(private sessionService: SessionService) { }

  get isPlayer(): boolean {
    return this.sessionService.getPlayer().equals(this.side);
  }

  ngOnInit() {
    this.isBankTransaction = this.transaction instanceof BankTransaction;
    this.isBank = this.side instanceof Bank;
  }

  click() {
    this._add = !this._add;
    this.add.emit(this._add);
  }

}
