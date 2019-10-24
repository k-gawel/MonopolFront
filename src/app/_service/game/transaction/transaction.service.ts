import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Transaction} from "../../../_model/instance/utils/transaction/Transaction";
import {Money} from "../../../_model/instance/properties/transferable/Money";
import {PropertyTransactionOperations} from "../../../_model/response/response/transaction/actions/TransactionActionResponse";
import {Transferable, TransferableCollection} from "../../../_model/instance/interfaces/Transferable";
import {TransactionInitResponse} from "../../../_model/response/response/transaction/init/TransactionInitResponse";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public $transaction: BehaviorSubject<Transaction> = new BehaviorSubject(null);

  constructor() { }

  setTransaction(transaction: Transaction) {
    if(this.$transaction.value != null)
      throw new Error("Can't initialize before closing other" + transaction + this.$transaction.value);

    this.$transaction.next(transaction);
  }


  fromJSON(json: JSON) {
    if(json == null) return;

    let transaction: Transaction = Transaction.get(json['init']);

    this.setOffers(transaction, json['offer']);

    transaction.add(new Money(json['initiator_money']), transaction.getInitiator());
    transaction.add(new Money(json['invited_money']), transaction.getInvited());

    let propertiesOperations = (<JSON[]> json['properties_operations'])
        .map(j => new PropertyTransactionOperations(j));
    this.setProperties(transaction, propertiesOperations);

    this.setTransaction(transaction);
  }


  fromResponse(response: TransactionInitResponse) {
    let transaction: Transaction = Transaction.get(response);
    this.setProperties(transaction, response.operations);
    this.setTransaction(transaction);
  }

  add(object: Object) {

  }

  setProperties(transaction: Transaction, properties: PropertyTransactionOperations[]) {
    properties.forEach(p => {
      let property = <Transferable>  TransferableCollection.ALL.getByUUID(p.property);
      property.setAddProperty(p.add);
      property.setRemoveProperty(p.remove);
    })
  }


  closeTransaction() {
    this.$transaction = null;
  }


  private setOffers(transaction: Transaction, offer: string[]) {
    let initiator = transaction.getInitiator();
    let invited = transaction.getInvited();
    let initiatorOffer = transaction.getInitiatorOffer();
    let invitedOffer = transaction.getInvitedOffer();

    offer.forEach(uuid => {
      let initiatorItem = initiatorOffer.getByUUID(uuid);
      let invitedItem = invitedOffer.getByUUID(uuid);

      if(initiatorItem != null)
        transaction.add(initiatorItem, initiator);
      else if(invitedItem != null)
        transaction.add(invitedItem, invited);
      else
        throw new Error("Item doesnt exists on any side " + uuid);
    })

  }









}
