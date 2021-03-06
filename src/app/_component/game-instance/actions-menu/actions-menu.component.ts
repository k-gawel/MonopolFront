import {Component, OnInit} from '@angular/core';
import {GameActionService} from "../../../_service/request/game-action/game-action.service";
import {Player} from "../../../_model/instance/Player";
import {SessionService} from "../../../_service/utils/cookies/session-service";
import {GameService} from "../../../_service/game/game/game.service";
import {Tour} from "../../../_model/instance/utils/Tour";
import {TransactionService} from "../../../_service/game/transaction/transaction.service";

@Component({
  selector: 'app-actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.css']
})
export class ActionsMenuComponent implements OnInit {

  constructor(private playerActionRequestService: GameActionService,
              private sessionService: SessionService,
              private gameService: GameService,
              private transactionService: TransactionService) {
  }

  getPlayers(): Player[] {
    return Player.ALL.toArray();
  }

  ngOnInit() {
    this.gameService.$currentTour.subscribe(t => this.currentTour = t);
  }

  currentTour: Tour;

  isAdmin() {
    return Player.isAdmin(this.sessionService.getPlayer());
  }

  isPlayerTour() {
    try {
      return this.sessionService.getPlayer().equals(this.currentTour.player);
    } catch (e) {
      return false;
    }
  }

  canStartGame(): boolean {
    return this.currentTour == null
        && Player.ALL.size() > 2
        && this.isAdmin();
  }

  canEndTour(): boolean {
    return this.isPlayerTour()
      && this.currentTour.dice_rolled
      && this.transactionService.$transaction.value == null;
  }

  endTour() {
    this.playerActionRequestService.endTour();
  }

  canRollDice(): boolean {
    return this.isPlayerTour()
      && !this.currentTour.dice_rolled
      && this.transactionService.$transaction.value == null;
  }

  rollTheDice() {
    this.playerActionRequestService.rollTheDice();
  }

  canLeave(): boolean {
    try {
      return !this.isPlayerTour() && this.transactionService.$transaction.value.getOffer(this.sessionService.getPlayer()) == null;
    } catch (e) {
      return true;
    }


  }

  leave() {
    this.playerActionRequestService.leave();
  }

}
