import { Component, OnInit } from '@angular/core';
import {Player} from "../../../../_model/instance/Player";
import {SessionService} from "../../../../_service/utils/cookies/session-service";
import {TransactionRequestService} from "../../../../_service/request/transaction/transaction-request.service";

@Component({
  selector: 'app-start-transaction',
  templateUrl: './start-transaction.component.html',
  styleUrls: ['./start-transaction.component.css']
})
export class StartTransactionComponent implements OnInit {

  constructor(private sessionService: SessionService,
              private requestService: TransactionRequestService) { }

  ngOnInit() {
  }

  getPlayers(): Player[] {
    return  Player.ACTIVE.array.filter(p => !p.equals(this.sessionService.getPlayer()))
  }

  initTransaction(player: Player) {
    this.requestService.initTransaction(player);
  }


}
