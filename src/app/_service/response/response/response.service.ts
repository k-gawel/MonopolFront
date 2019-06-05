import {Injectable, OnInit} from '@angular/core';
import {ResponseMessageBuilder} from "../../../_model/response/builder/ResponseMessageBuilder";
import {GameActionResponse} from "../../../_model/response/response/game/GameActionResponse";
import {PlayerActionResponse} from "../../../_model/response/response/player/PlayerActionResponse";
import {TransactionActionResponse} from "../../../_model/response/response/transaction/actions/TransactionActionResponse";
import {TransactionResponse} from "../../../_model/response/response/transaction/TransactionResponse";
import {PlayerActionResponseService} from "../player-action/player-action-response.service";
import {TransactionResponseService} from "../transaction/transaction-response.service";
import {GameActionResponseService} from "../game-action/game-action-response.service";
import {stringify} from "querystring";
import {WebSocketService} from "../../utils/web-socket/web-socket.service";

@Injectable({
  providedIn: 'root'
})
export class ResponseService  {

  constructor(private playerActionService: PlayerActionResponseService,
              private transactionService: TransactionResponseService,
              private gameActionService: GameActionResponseService) {
  }

  receiveMessage(json: JSON) {
    let message = ResponseMessageBuilder.get(json);
    console.log("RECEIVER MESSAGE", message);

    if (message instanceof GameActionResponse)
      this.gameActionService.receiveMessage(message);
    else if (message instanceof PlayerActionResponse)
      this.playerActionService.receiveMessage(message);
    else if (message instanceof TransactionResponse)
      this.transactionService.receiveMessage(message);
    else
      throw new Error("Wrong response message type: " + stringify(message));
  }


}
