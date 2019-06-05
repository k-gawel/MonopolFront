import {Injectable} from '@angular/core';
import {Bank, Player} from "../../../_model/instance/Player";
import {TransactionInitRequest} from "../../../_model/request/transaction/init/TransactionInitRequest";
import {Town} from "../../../_model/instance/properties/transferable/Town";
import {Improvement} from "../../../_model/instance/properties/transferable/Improvement";
import {Utility} from "../../../_model/instance/properties/transferable/Utility";
import {TransactionAddExistingRequest} from "../../../_model/request/transaction/action/add/TransactionAddExistingRequest";
import {TransactionAddMoneyRequest} from "../../../_model/request/transaction/action/add/TransactionAddMoneyRequest";
import {TransactionAddNewDiscountRequest} from "../../../_model/request/transaction/action/add/TransactionAddNewDiscountRequest";
import {TransactionAddNewImprovementRequest} from "../../../_model/request/transaction/action/add/TransactionAddNewImprovementRequest";
import {SessionService} from "../../utils/cookies/session-service";
import {TransactionRemoveItemRequest} from "../../../_model/request/transaction/action/remove/TransactionRemoveItemRequest";
import {AbstractInstance} from "../../../_model/instance/utils/AbstractInstance";
import {TransactionActionRequest} from "../../../_model/request/transaction/action/TransactionActionRequest";
import {TransactionStatusRequest} from "../../../_model/request/transaction/action/status/TransactionStatusRequest";
import {TransactionRequest} from "../../../_model/request/transaction/TransactionRequest";
import {TransactionService} from "../../game/transaction/transaction.service";
import {RequestService} from "../request/request.service";
import {Transaction} from "../../../_model/instance/utils/transaction/Transaction";
import {Transferable} from "../../../_model/instance/interfaces/Transferable";

@Injectable({
  providedIn: 'root'
})
export class TransactionRequestService {

  constructor(private sessionService: SessionService,
              private transactionService: TransactionService,
              private requestService: RequestService) {
  }

  currentTransaction(): Transaction {
    return this.transactionService.$transaction.value;
  }

  public initTransaction(player: Player) {
    let request: TransactionInitRequest = new TransactionInitRequest();
    request.initiator = this.sessionService.getPlayerUUID();
    request.invited = player.uuid;
    this.sendRequest(request);
  }

  public addExistingTransferable(transferable: Town | Improvement | Utility) {
    let request = new TransactionAddExistingRequest();
    request.side = transferable.getOwner().uuid;
    request.transferable = transferable.uuid;
    this.sendAction(request);
  }


  public addMoney(side: Player, money: number) {
    let request: TransactionAddMoneyRequest = new TransactionAddMoneyRequest();
    request.side = side.uuid;
    request.amount = money;
    this.sendAction(request);
  }


  public addNewDiscount(chargeable: Town | Utility, percentage: boolean, value: number, endTour: number) {
    let request: TransactionAddNewDiscountRequest = new TransactionAddNewDiscountRequest();
    request.side = chargeable.getOwner().uuid;
    request.chargeable = chargeable.uuid;
    request.end_tour = endTour;
    request.chargeable_type = chargeable instanceof Town ? "town" : "utility";
    request.discount_type = percentage ? "percentage" : "fixed";
    request.value = value;
    this.sendAction(request);
  }


  public addNewImprovement(side: Player, town: Town) {
    let request: TransactionAddNewImprovementRequest = new TransactionAddNewImprovementRequest();
    request.side = Bank.get().uuid;
    request.town = town.uuid;
    this.sendAction(request);
  }


  public removeItem(item: Transferable) {
    let request = new TransactionRemoveItemRequest();
    request.side = item.getOwner().uuid;
    request.transferable = item.uuid;
    this.sendAction(request);
  }


  public setStatus(status: boolean) {
    let request = new TransactionStatusRequest();
    request.side = this.sessionService.getPlayerUUID();
    request.status = status;
    this.sendAction(request);
  }


  private sendAction(request: TransactionActionRequest) {
    request.transaction = this.transactionService.$transaction.value.uuid;
    this.sendRequest(request);
  }


  private sendRequest(request: TransactionRequest) {
    this.requestService.sendMessage(request);
  }


}
