import {Injectable} from '@angular/core';
import {PlayerMoveResponse} from "../../../_model/response/response/player/PlayerMoveResponse";
import {Player} from "../../../_model/instance/Player";
import {Board} from "../../../_model/board/Board";
import {Field} from "../../../_model/board/Field";
import {PlayerLeaveResponse} from "../../../_model/response/response/player/PlayerLeaveResponse";
import {PlayerActionResponse} from "../../../_model/response/response/player/PlayerActionResponse";
import {stringify} from "querystring";
import {GameService} from "../../game/game/game.service";
import {InfoCardService} from "../../game/field-info/info-card.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerActionResponseService {

  constructor(private gameService: GameService,
              private infoService: InfoCardService) { }

  public receiveMessage(message: PlayerActionResponse) {
    if(message instanceof PlayerMoveResponse)
      this.move(message);
    else if(message instanceof PlayerLeaveResponse)
      this.leave(message);
    else
      throw new Error("Wrong player action type " + stringify(message));
  }

  move(message: PlayerMoveResponse) {
    let player: Player = Player.get(message.playerUuid);
    let board: Board = this.gameService.$board.value;
    let destination: Field = board.getByUUID(message.destination);
    this.infoService.setField(destination);
    this.gameService.$currentTour.value.dice_rolled = true;
    board.movePlayer(player, destination);
  }

  leave(message: PlayerLeaveResponse) {
    let player: Player = Player.get(message.playerUuid);
    let board: Board = this.gameService.$board.value;

    board.removePlayer(player);
  }

}
