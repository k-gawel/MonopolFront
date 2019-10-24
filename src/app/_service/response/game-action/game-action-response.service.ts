import {Injectable} from '@angular/core';
import {GameActionResponse} from "../../../_model/response/response/game/GameActionResponse";
import {NewTourResponse} from "../../../_model/response/response/game/NewTourResponse";
import {Tour} from "../../../_model/instance/utils/Tour";
import {GameService} from "../../game/game/game.service";
import {NewPlayerResponse} from "../../../_model/response/response/game/NewPlayerResponse";
import {combineAll} from "rxjs/operators";
import {ChatService} from "../../game/chat/chat.service";
import {ChatMessageResponse} from "../../../_model/response/response/game/ChatMessageResponse";

@Injectable({
  providedIn: 'root'
})
export class GameActionResponseService {

  constructor(private gameService: GameService,
              private chatService: ChatService) { }


  public receiveMessage(message: GameActionResponse) {
    if(message instanceof NewTourResponse)
      this.newTour(message);
    else if(message instanceof NewPlayerResponse)
      this.newPlayer(message);
    else if(message instanceof ChatMessageResponse)
      this.chatService.receiveMessage(message);
    else
      throw new Error("Wrong game action message type");
  }

  private newTour(message: NewTourResponse) {
    let tour: Tour = new Tour();
    tour.player = message.tour.player;
    tour.index = message.tour.index;
    tour.endTime = message.tour.endTime;
    tour.dice_rolled = false;
    tour.rolled = null;
    this.chatService.endOfTourMessage(tour);
    this.gameService.$currentTour.next(tour);
  }

  private newPlayer(message: NewPlayerResponse) {
    this.gameService.addPlayer(message.player);
    this.chatService.newPlayerMessage(message.player);
  }



}
