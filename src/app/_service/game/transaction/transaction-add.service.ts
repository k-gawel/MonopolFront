import { Injectable } from '@angular/core';
import {Chargeable} from "../../../_model/instance/interfaces/Chargeable";
import {TransactionAddNewDiscountRequest} from "../../../_model/request/transaction/action/add/TransactionAddNewDiscountRequest";
import {Town} from "../../../_model/instance/properties/transferable/Town";
import {AbstractInstance} from "../../../_model/instance/utils/AbstractInstance";
import {Transferable} from "../../../_model/instance/interfaces/Transferable";
import {Bank, Player} from "../../../_model/instance/Player";
import {TransactionAddMoneyRequest} from "../../../_model/request/transaction/action/add/TransactionAddMoneyRequest";
import {TransactionAddNewImprovementRequest} from "../../../_model/request/transaction/action/add/TransactionAddNewImprovementRequest";
import {TransactionAddExistingRequest} from "../../../_model/request/transaction/action/add/TransactionAddExistingRequest";
import {TransactionRequestService} from "../../request/transaction/transaction-request.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionAddService {

  constructor(private requestServide: TransactionRequestService) { }

  getNewDiscountRequest(chargeable: Chargeable, value: number, fixed: boolean, endTour: number): TransactionAddNewDiscountRequest {
    let result = new TransactionAddNewDiscountRequest();
    // @ts-ignore
    result.side = (<Transferable> chargeable).getOwner().uuid;
    result.chargeable = chargeable.uuid;
    result.chargeable_type = chargeable instanceof Town ? "town" : "utility";
    result.value = value;
    result.discount_type = fixed ? "fixed" : "percentage";
    result.end_tour = endTour;
    return result;
  }

  getAddMoneyRequest(amount: number, side: Player): TransactionAddMoneyRequest {
    let result = new TransactionAddMoneyRequest();
    result.side = side.uuid;
    result.amount = amount;
    return result;
  }

  getNewImprovementRequest(town: Town): TransactionAddNewImprovementRequest {
    let result = new TransactionAddNewImprovementRequest();
    result.side = Bank.get().uuid;
    result.town = town.uuid;
    return result;
  }

  getExistingTransferableRequest(transferable: Transferable): TransactionAddExistingRequest {
    let result = new TransactionAddExistingRequest();
    result.side = transferable.getOwner().uuid;
    result.transferable = transferable.uuid;
    return result;
  }

}
