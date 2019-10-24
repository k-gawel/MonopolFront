import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Board} from "../../../_model/board/Board";
import {Tour} from "../../../_model/instance/utils/Tour";
import {RequestService} from "../../request/request/request.service";
import {SessionService} from "../../utils/cookies/session-service";
import {Player} from "../../../_model/instance/Player";
import {Town, TownRegion} from "../../../_model/instance/properties/transferable/Town";
import {Utility, UtilityRegion} from "../../../_model/instance/properties/transferable/Utility";
import {CardGroup} from "../../../_model/instance/properties/CardGroup";
import {Discount} from "../../../_model/instance/properties/transferable/Discount";
import {WebSocketService} from "../../utils/web-socket/web-socket.service";
import {Transaction} from "../../../_model/instance/utils/transaction/Transaction";
import {TransactionService} from "../transaction/transaction.service";
import {ChatService} from "../chat/chat.service";
import {TransferableCollection} from "../../../_model/instance/interfaces/Transferable";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public $board: BehaviorSubject<Board> = new BehaviorSubject(undefined);
  public $currentTour: BehaviorSubject<Tour> = new BehaviorSubject(null);


  constructor(private sessionService: SessionService,
              private requestService: RequestService,
              private webSocketService: WebSocketService,
              private transactionService: TransactionService) { }


  getExistingGame() {
    let clean = () => {
        this.sessionService.clean();
        this.$board.next(null);
    };

    let processResult = (r) => {
      if(r != null) this.createGame(r);
      else clean();
    };

    this.requestService.existingPlayerGame(this.sessionService.getSession())
        .then(processResult)
        .catch(clean);
  }

  addPlayer(player: Player) {
    this.$board.value.putPlayer(player);
  }


  createGame(json: JSON) {
    let session: string = Object.keys(json)[0];
    this.sessionService.setGameSession(session);
    this.webSocketService.initSocket(this.sessionService.getGameUuid());
    let gameJson: JSON = json[session];

    this.cleanLists();

    Player.get(gameJson['bank']);
    Player.ADMIN = gameJson['admin'];
    (<JSON[]> gameJson['players']).forEach(p => Player.get(p));
    (<JSON[]> gameJson['town_regions']).forEach(r => TownRegion.get(r));
    (<JSON[]> gameJson['utility_regions']).forEach(r => UtilityRegion.get(r));
    (<JSON[]> gameJson['card_groups']).forEach(g => CardGroup.get(g));
    (<JSON[]> gameJson['discounts']).forEach(d => Discount.get(d));

    this.$currentTour.next(Tour.get(gameJson['current_tour']));
    this.transactionService.fromJSON(gameJson['current_transaction']);
    this.$board.next(Board.get(gameJson['board']));
  }

  cleanLists() {
    Player.ALL.clean();
    Town.ALL.clean();
    TownRegion.ALL.clean();
    UtilityRegion.ALL.clean();
    Utility.ALL.clean();
    CardGroup.ALL.clean();
    Discount.ALL.clean();
  }

  abortGame(winner?: Player) {
    if (winner != undefined)
      alert(winner.name + " HAS WON!");

    this.webSocketService.closeSocket();
    this.$board.next(null);
    this.cleanLists();
    this.sessionService.clean();
  }



}
