import { Injectable } from '@angular/core';
import {RequestMessage} from "../../../_model/request/RequestMessage";
import {WebSocketService} from "../../utils/web-socket/web-socket.service";
import {SessionService} from "../../utils/cookies/session-service";
import {RestApiService} from "../../utils/rest-api/rest-api.service";
import {GameLink} from "../../../_model/response/GameLink";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private webSocketService: WebSocketService,
              private restService: RestApiService,
              private sessionService: SessionService) { }


  sendMessage(message: RequestMessage) {
      message.game = this.sessionService.getGameUuid();
      message.session = this.sessionService.getSession();
      return this.webSocketService.sendRequest(message);
  }



  getList(): Promise<GameLink[]> {
    return this.restService.getList()
        .then((json: JSON[]) => json.map(j => new GameLink(j)));
  }


  newPlayerGame(playerName: string, gameUuid?: string): Promise<JSON> {
    return  gameUuid == null ?
        this.restService.createNewGame(playerName)
        : this.restService.joinGame(gameUuid, playerName);
  }


  existingPlayerGame(session: string): Promise<JSON> {
    return this.restService.getGame(session);
  }

}
