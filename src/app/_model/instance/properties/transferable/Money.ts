import {Transferable} from "../../interfaces/Transferable";
import {Bank, Player} from "../../Player";
import {AbstractInstance, InstancesList} from "../../utils/AbstractInstance";
import {AbstractTransferable} from "./AbstractTransferable";

export class Money extends AbstractTransferable implements Transferable {

  owner: Player;
  amount: number;

  constructor(ref?: string | number) {
    if(typeof ref === 'string') {
      super(ref);
      Money.ALL.push(this);
    } else if(typeof ref === 'number') {
      this.amount = ref;
    } else {
      this.amount = 0;
    }
  }

  static ALL: InstancesList<Money> = new InstancesList();

  static get(ref: JSON | string): Money {
    if(typeof ref === 'string')
      return this.ALL.getByUUID(ref);

    let json: JSON = <JSON> ref;
    let result: Money = this.ALL.getByUUID(json['uuid']);
    if(result == null)
      result = json['type'] === 'bank' ? new BankMoney(json['uuid']) : new Money(json['uuid']);

    result.amount = json['amount'];
    result.owner = Player.get(json['owner']);
    result.owner.properties.push(result);

    return result;
  }

  compareTo(money: Money): number {
    if(this.amount > money.amount)
      return 1;
    else if(this.amount === money.amount)
      return 0;
    else
      return -1;
  }

  subtract(money: Money): Money {
    if(this.amount < money.amount)
      throw new Error("Can not subtract");

    this.amount -= money.amount;
    return this;
  }

  add(money: Money): Money {
    this.amount += money.amount;
    return this;
  }

  canBeTransferred(sender: Player, receiver: Player): boolean {
    return sender.properties.getMoney().compareTo(this) >= 0;
  }

  getBasicPrice(): Money {
    let result: Money = new Money();
    result.amount = this.amount;
    return result;
  }

  getOwner(): Player {
    return this.owner;
  }

  transfer(sender: Player, receiver: Player) {
    sender.properties.getMoney().subtract(this);
    receiver.properties.getMoney().add(this);
  }

  static instanceOf(object: any): boolean {
    let objectMoney: Money = <Money> object;
    return objectMoney.amount != undefined;
  }

  toString(): string {
    return "$" + this.amount;
  }

}


export class BankMoney extends Money {

  compareTo(money: Money): number {
    return 1;
  }

  subtract(money: Money): Money {
    return this;
  }

  add(money: Money): Money {
    return this;
  }

  canBeTransferred(sender: Player, receiver: Player): boolean {
    return false;
  }

  getBasicPrice(): Money {
    return this;
  }

  getOwner(): Player {
    return this.owner;
  }

  transfer(sender: Player, receiver: Player) {
  }


}
