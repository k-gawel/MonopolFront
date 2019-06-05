import {Injectable} from '@angular/core';
import {Player} from "../../../_model/instance/Player";
import {Transaction} from "../../../_model/instance/utils/transaction/Transaction";
import {TransactionResponse} from "../../../_model/response/response/transaction/TransactionResponse";
import {TransactionActionResponse} from "../../../_model/response/response/transaction/actions/TransactionActionResponse";
import {TransactionInitResponse} from "../../../_model/response/response/transaction/init/TransactionInitResponse";
import {TransactionResultResponse} from "../../../_model/response/response/transaction/result/TransactionResultResponse";
import {TransactionItemResponse} from "../../../_model/response/response/transaction/actions/item/TransactionItemResponse";
import {TransactionStatusResponse} from "../../../_model/response/response/transaction/actions/status/TransactionStatusResponse";
import {TransactionAddResponse} from "../../../_model/response/response/transaction/actions/item/TransactionAddResponse";
import {TransactionRemoveResponse} from "../../../_model/response/response/transaction/actions/item/TransactionRemoveResponse";
import {Transferable, TransferableCollection} from "../../../_model/instance/interfaces/Transferable";
import {TransactionService} from "../../game/transaction/transaction.service";
import {ChatService} from "../../game/chat/chat.service";
import {InstancesList} from "../../../_model/instance/utils/AbstractInstance";
import {AbstractTransferable} from "../../../_model/instance/properties/transferable/AbstractTransferable";

@Injectable({
  providedIn: 'root'
})
export class TransactionResponseService {

  constructor(private transactionService: TransactionService,
              private chatService: ChatService) { }


  private currentUuid(): string {
    try {
      return this.transactionService.$transaction.value.uuid;
    } catch (e) {
      return null;
    }
  }


  private currentTransaction(): Transaction {
    return this.transactionService.$transaction.value;
  }


  receiveMessage(message: TransactionResponse) {

    if(message instanceof TransactionActionResponse)
      this.processAction(message);
    else if (message instanceof TransactionInitResponse)
      this.initializeTransaction(message);
    else if (message instanceof TransactionResultResponse)
      this.processResult(message);
    else
      throw new Error("Wrong transaction message type " + message);

  }


  private initializeTransaction(message: TransactionInitResponse) {
    this.transactionService.fromResponse(message);
  }


  private processAction(message: TransactionActionResponse) {
    if (message instanceof TransactionItemResponse)
      this.processItemAction(message);
    else if (message instanceof TransactionStatusResponse)
      this.processStatusAction(message);
    else
      throw new Error("Wrong transaction's action message type " + JSON.stringify(message));
  }


  private processItemAction(message: TransactionItemResponse) {
    let t = this.transactionService.$transaction.value;
    let properties = TransferableCollection.ALL;
    message.operations.forEach(o => {
      let property = <Transferable> properties.getByUUID(o.property);
      property.setAddProperty(o.add);
      property.setRemoveProperty(o.remove);
    });
    if(message instanceof TransactionAddResponse)
      this.addItem(message);
    else if(message instanceof TransactionRemoveResponse)
      this.removeItem(message);
    else
      throw new Error("Wrong transaction item message type " + message);


  }


  private addItem(message: TransactionAddResponse) {
    let side: Player = Player.get(message.side);
    let item: Transferable = message.transferable;

    this.currentTransaction().getOffer(side).push(item);
  }


  private removeItem(message: TransactionRemoveResponse) {
    let side: Player = Player.get(message.side);
    let offer: TransferableCollection = this.currentTransaction().getOffer(side);
    let item = offer.getByUUID(message.transferable);
    offer.remove(item);
  }


  private processStatusAction(message: TransactionStatusResponse) {
    let transaction = this.currentTransaction();
    let status = message['status'];
    let side = Player.get(message.side);

  }


  private closeTransaction() {
    if(this.currentTransaction() == null) return;

    InstancesList.ALL.toArray()
        .filter(i => i instanceof AbstractTransferable)
        .map(i => <Transferable> i)
        .forEach(t => {
          t.setRemoveProperty(null);
          t.setAddProperty(null);
        });
    this.transactionService.$transaction.next(null);
  }


  private processResult(message: TransactionResultResponse) {
    this.chatService.transactionResultMessage(message);

    let initiator = Player.get(message.initiator);
    let invited   = Player.get(message.invited);

    message.initiatorMoney.transfer(initiator, invited);
    message.invitedMoney.transfer(invited, initiator);

    message.initiatorOffer.forEach(uuid => initiator.properties.getByUUID(uuid).transfer(initiator, invited));
    message.invitedOffer.forEach(uuid => invited.properties.getByUUID(uuid).transfer(invited, initiator));

    this.closeTransaction();
  }


}
