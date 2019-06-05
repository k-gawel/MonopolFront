import {Component, Input, OnInit} from '@angular/core';
import {
  BankTransaction,
  CompulsoryTransaction,
  Transaction, VoluntaryTransaction
} from "../../../../_model/instance/utils/transaction/Transaction";
import {SessionService} from "../../../../_service/utils/cookies/session-service";
import {Money} from "../../../../_model/instance/properties/transferable/Money";
import {TransactionRequestService} from "../../../../_service/request/transaction/transaction-request.service";

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.css']
})
export class TransactionStatusComponent implements OnInit {

  constructor(private sessionService: SessionService,
              private requestService: TransactionRequestService) { }

  @Input() transaction: Transaction;

  ngOnInit() {
  }

  setStatus(status: boolean) {
    return this.requestService.setStatus(status);
  }

  isInitiator(): boolean {
    return this.sessionService.getPlayer().equals(this.transaction.getInitiator());
  }

  isBank(): boolean {
    return this.transaction instanceof BankTransaction;
  }

  isCompulsory(): boolean {
    return this.transaction instanceof CompulsoryTransaction
  }

  isVoluntary(): boolean {
    return this.transaction instanceof VoluntaryTransaction;
  }

  getDifference(): number {
    let playerOffer = this.transaction.getOffer(this.isInitiator() ? this.transaction.getInitiator() : this.transaction.getInvited());
    let otherSideOffer = this.transaction.getOffer(this.isInitiator() ? this.transaction.getInvited() : this.transaction.getInitiator());

    return playerOffer.getBasicPrice().amount - otherSideOffer.getBasicPrice().amount;
  }

  canAfford(): boolean {
    return this.sessionService.getPlayer().properties.getMoney().amount >= (-1)*this.getDifference();
  }

  getDemand(): Money {
    return (<CompulsoryTransaction> this.transaction).demand;
  }

}
