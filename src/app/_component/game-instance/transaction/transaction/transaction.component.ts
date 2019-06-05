import {Component, Input, OnInit} from '@angular/core';
import {SessionService} from "../../../../_service/utils/cookies/session-service";
import {Transaction} from "../../../../_model/instance/utils/transaction/Transaction";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  @Input() transaction: Transaction;

  ngOnInit() {
  }

  player() {
    return this.sessionService.getPlayer();
  }

  otherSide() {
    return this.transaction.getOppositeSide(this.player());
  }

}
