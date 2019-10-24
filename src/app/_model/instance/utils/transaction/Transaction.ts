import {Transferable, TransferableCollection} from "../../interfaces/Transferable";
import {Money} from "../../properties/transferable/Money";
import {Bank, Player} from "../../Player";
import {AbstractInstance} from "../AbstractInstance";
import {BankTransactionInitResponse} from "../../../response/response/transaction/init/BankTransactionInitResponse";
import {CompulsoryTransactionInitResponse} from "../../../response/response/transaction/init/CompulsoryTransactionInitResponse";
import {TransactionInitResponse} from "../../../response/response/transaction/init/TransactionInitResponse";
import {VoluntaryTransactionInitResponse} from "../../../response/response/transaction/init/VoluntaryTransactionInitResponse";

export abstract class Transaction extends AbstractInstance {

  private initiatorStatus: boolean | null;
  private invitedStatus: boolean | null;

  abstract getInitiator(): Player;
  abstract getInvited(): Player;

  abstract getInitiatorOffer(): TransferableCollection;
  abstract getInvitedOffer(): TransferableCollection;

  canBeAddedToTransaction(item: Transferable): boolean {
    return !Money.instanceOf(item)
      && !this.getInitiatorOffer().contains(item)
      && !this.getInvitedOffer().contains(item)};


  accept(side: Player) {
    if(side.equals(this.getInitiator()))
      this.initiatorStatus = true;
    if(side.equals(this.getInvited()))
      this.invitedStatus = true;
  }

  accepted(): boolean | null {
    if(this.initiatorStatus && this.invitedStatus)
      return true;
    if(this.initiatorStatus == true || this.invitedStatus == true)
      return null;
    if(this.initiatorStatus === null && this.invitedStatus === null)
      return false;
  }


  add(item: Transferable, side?: Player): boolean {
    if(Money.instanceOf(item))
      return this.addMoney(<Money> item, side);

    try {
      this.getOfferForItem(item).push(item);
      return true;
    } catch (e) {
      return false;
    }
  }


  remove(item: Transferable): boolean {
    if(Money.instanceOf(item))
      return false;

    if(this.getInvitedOffer().remove(item))
      return true;
    else
      return this.getInitiatorOffer().remove(item);
  }


  getOffer(side: Player): TransferableCollection {
    if(this.getInitiator().equals(side))
      return this.getInitiatorOffer();
    else if(this.getInvited().equals(side))
      return this.getInvitedOffer();
  }


  getOppositeSide(side: Player): Player {
    if(this.getInvited().equals(side))
      return this.getInitiator();
    else if(this.getInitiator().equals(side))
      return this.getInvited();
  }


  private addMoney(money: Money, side: Player): boolean {
    if(side == undefined)
      throw new Error("Side must be defined while adding money");
    this.getOffer(side).getMoney().amount = money.amount;
    return true;
  }

  private getOfferForItem(item: Transferable): TransferableCollection {
    if(Money.instanceOf(item))
      throw new Error("Parameter must not  be type of money");
    return this.getOffer(item.getOwner());
  }

  static instanceOf(o: any): boolean {
    if(o == undefined)
      return false;

    let t: Transaction = <Transaction> o;

    return t.getInitiator !== undefined && t.getInvited !== undefined
        && t.getInitiatorOffer !== undefined && t.getInvitedOffer !== undefined
        && t.remove !== undefined && t.getOffer !== undefined
        && t.getOppositeSide !== undefined;
    return true;
  }


  static get(message: TransactionInitResponse): Transaction {
    let result: Transaction;

    let xd = new BankTransactionInitResponse();

    if(message instanceof BankTransactionInitResponse)
      return BankTransaction.get(<BankTransactionInitResponse> message);
    if(message instanceof CompulsoryTransactionInitResponse)
      return CompulsoryTransaction.get(<CompulsoryTransactionInitResponse> message);
    else if(VoluntaryTransactionInitResponse.instanceOf(message))
      return VoluntaryTransaction.get(<VoluntaryTransactionInitResponse> message);
    else
      throw new Error("Wrong transaction type " + message);

    return result;
  }

  toString(): string {
    return "Transaction of " + this.getInitiator().toString() + " and " + this.getInvited().toString();
  }

}


export class BankTransaction extends Transaction {

  bank: Bank;
  player: Player;

  playerOffer: TransferableCollection = new TransferableCollection();
  bankOffer: TransferableCollection = new TransferableCollection();

  static get(message: BankTransactionInitResponse): BankTransaction {
    let result: BankTransaction = new BankTransaction(message.transaction);

    result.player = Player.get(message.initiator);
    result.bank = Bank.get();
    if(message.invited != result.bank.uuid)
      throw new Error("Gmae's bank uuid is different from message");

    return result;
  }

  getInitiator(): Player {
    return this.player;
  }

  getInitiatorOffer(): TransferableCollection {
    return this.playerOffer;
  }

  getInvited(): Player {
    return this.bank;
  }

  getInvitedOffer(): TransferableCollection {
    return this.bankOffer;
  }

  static instanceOf(o: any): boolean {
    if(o == null) return false;

    let t: BankTransaction = <BankTransaction> o;

    return Transaction.instanceOf(t) && t.bank !== undefined
        && t.player !== undefined && t.playerOffer !== undefined
        && t.bankOffer !== undefined;
  }

}


export class CompulsoryTransaction extends Transaction {

  demand: Money;

  executor: Player;
  target: Player;

  executorOffer: TransferableCollection = new TransferableCollection();
  targetOffer: TransferableCollection = new TransferableCollection();

  static get(message: CompulsoryTransactionInitResponse): CompulsoryTransaction {
    let result = new CompulsoryTransaction(message.transaction);

    result.executor = Player.get(message.initiator);
    result.target = Player.get(message.invited);
    result.demand = new Money(message.demand);



    return result;
  }

  getDemand(): Money {
    return this.demand;
  }

  getInitiator(): Player {
    return this.executor;
  }

  getInitiatorOffer(): TransferableCollection {
    return this.executorOffer;
  }

  getInvited(): Player {
    return this.target;
  }

  getInvitedOffer(): TransferableCollection {
    return this.targetOffer;
  }

  static instanceOf(o: any): boolean {
    if(o == undefined)
      return false;

    let t: CompulsoryTransaction = <CompulsoryTransaction> o;

    return Transaction.instanceOf(t) && t.targetOffer !== undefined
        && t.executorOffer !== undefined && t.executor !== undefined
        && t.target !== undefined;
  }

}


export class VoluntaryTransaction extends Transaction {

  initiator: Player;
  invited: Player;

  initiatorOffer: TransferableCollection = new TransferableCollection();
  invitedOffer: TransferableCollection = new TransferableCollection();

  static get(message: VoluntaryTransactionInitResponse): VoluntaryTransaction {
    let result = new VoluntaryTransaction(message.transaction);

    result.initiator = Player.get(message.initiator);
    result.invited = Player.get(message.invited);

    return result;
  }


  getInitiator(): Player {
    return this.initiator;
  }

  getInitiatorOffer(): TransferableCollection {
    return this.initiatorOffer;
  }

  getInvited(): Player {
    return this.invited;
  }

  getInvitedOffer(): TransferableCollection {
    return this.invitedOffer;
  }

  static instanceOf(o: any): boolean {
    if(o == null)
      return false;

    let t: VoluntaryTransaction = <VoluntaryTransaction> o;

    return t.initiator !== undefined && t.invited !== undefined
        && t.initiatorOffer !== undefined && t.invitedOffer !== undefined
        && Transaction.instanceOf(t);
  }

}
