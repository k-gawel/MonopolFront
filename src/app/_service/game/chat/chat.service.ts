import {Injectable} from '@angular/core';
import {TransactionResultResponse} from "../../../_model/response/response/transaction/result/TransactionResultResponse";
import {Player} from "../../../_model/instance/Player";
import {Tour} from "../../../_model/instance/utils/Tour";
import {Subject} from "rxjs";
import {init} from "protractor/built/launcher";
import {TransferableCollection} from "../../../_model/instance/interfaces/Transferable";
import {ChatMessageRequest} from "../../../_model/request/utils/ChatMessageRequest";
import {SessionService} from "../../utils/cookies/session-service";
import {RequestService} from "../../request/request/request.service";
import {ChatMessageResponse} from "../../../_model/response/response/game/ChatMessageResponse";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public $message: Subject<any[]> = new Subject();

  constructor(private sessionService: SessionService,
              private requestService: RequestService) { }

  sendMessage(message: string) {
    let request = new ChatMessageRequest();
    request.player  = this.sessionService.getPlayer().uuid;
    request.message = message;
    this.requestService.sendMessage(request);
  }

  receiveMessage(message: ChatMessageResponse) {
    let m = [message.player, ": ", message.message];
    this.$message.next(m);
  }

  transactionResultMessage(result: TransactionResultResponse) {
    let message = [];
    let initiator = Player.get(result.initiator);
    let invited = Player.get(result.invited);

    message.push("SYSTEM: ");

    message.push("Transaction ended\n");

    message.push(Player.get(result.initiator));
    message.push(" traded ");
    message.push(result.initiatorMoney);
    result.initiatorOffer.forEach(uuid => {
      message.push(", ");
      message.push(TransferableCollection.ALL.getByUUID(uuid));
    } );
    message.push(".\n");

    message.push(Player.get(result.invited));
    message.push(" traded ");
    message.push(result.invitedMoney);
    result.initiatorOffer.forEach(uuid => {
      message.push(", ");
      message.push(TransferableCollection.ALL.getByUUID(uuid));
    } );

    this.$message.next(message);
  }



  playerLeaveMessage(player: Player) {
    let message: any[] = [];

    message.push("SYSTEM: ");
    message.push("PLAYER LEAVE - ");
    message.push(player);

    this.$message.next(message);
  }


  newPlayerMessage(player: Player) {
    let message: any[] = [];

    message.push("SYSTEM: ");
    message.push("NEW PLAYER ");
    message.push(player);

    this.$message.next(message);
  }


  endOfTourMessage(tour: Tour) {
    let message: any[] = [];

    message.push("SYSTEM: TOUR " + tour.index);

    this.$message.next(message);
  }



}
