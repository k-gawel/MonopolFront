import {Component, OnInit} from '@angular/core';
import {Player} from "../../../../_model/instance/Player";
import {Transaction} from "../../../../_model/instance/utils/transaction/Transaction";
import {TransactionService} from "../../../../_service/game/transaction/transaction.service";
import {SessionService} from "../../../../_service/utils/cookies/session-service";
import {TransactionRequestService} from "../../../../_service/request/transaction/transaction-request.service";
import {GameService} from "../../../../_service/game/game/game.service";

@Component({
  selector: 'app-transaction-container',
  templateUrl: './transaction-container.component.html',
  styleUrls: ['./transaction-container.component.css']
})
export class TransactionContainerComponent implements OnInit {

  constructor(private transactionService: TransactionService,
              private sessionService: SessionService,
              private gameService: GameService) {
  }

  transaction: Transaction;

  ngOnInit() {
    this.transactionService.$transaction.subscribe(t => this.transaction = t);
  }

  isPlayerSide() {
    return this.transaction != null
        && (this.sessionService.getPlayer().equals(this.transaction.getInitiator())
        || this.sessionService.getPlayer().equals(this.transaction.getInvited()));
  }

  canStartTransaction(): boolean {
    return this.transaction == null
        && this.gameService.$currentTour.value != null
        && this.gameService.$currentTour.value.player.equals(this.sessionService.getPlayer());
  }

}
