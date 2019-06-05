import {Player} from "../Player";
import {Money} from "../properties/transferable/Money";
import {Instance, InstancesList} from "../utils/AbstractInstance";
import {Discount} from "../properties/transferable/Discount";
import {Utility} from "../properties/transferable/Utility";
import {Town} from "../properties/transferable/Town";
import {Improvement} from "../properties/transferable/Improvement";


export interface Transferable extends Instance {
  getOwner(): Player;
  getBasicPrice(): Money;
  transfer(sender: Player, receiver: Player);
  toString(): string;

  addProperty(): boolean | null;
  setAddProperty(value: boolean | null);

  removeProperty(): boolean | null;
  setRemoveProperty(value: boolean | null);

}


export class TransferableCollection extends InstancesList<Transferable> {

  private money: Money = new Money();
  private discounts: Discount[] = [];

  static get(items: string[]): TransferableCollection {
    let result: TransferableCollection = new TransferableCollection();

    result.money = new Money(Number.parseInt(items[0]));

    for(let i = 1; i < items.length; i++) {
      
    }

    return null;
  }

  public push(t: Transferable): this {
    if(t instanceof Money)
      this.putMoney(t);
    else if(t instanceof Discount)
      this.putDiscount(t);
    else
      super.push(t);
    return this;
  }

  private putDiscount(discount: Discount) {
    let currentDiscount = this.getDiscount(discount.chargeable);
    this.remove(currentDiscount);
    super.push(discount);
  }

  private putMoney(money: Money) {
    if(this.money.uuid == null && money.uuid != null)
      this.money = money;
    else
      this.money.add(money);
  }

  public getDiscount(chargeable: Town | Utility): Discount {
    return this.discounts.find(d => d.chargeable.equals(chargeable));
  }

  public getMoney(): Money {
    return this.money;
  }

  public contains(transferable: Transferable | Money): boolean {
    if(Money.instanceOf(transferable))
      return this.money.compareTo(<Money> transferable) >= 0;
    else
      return super.contains(transferable);
  }

  public getBasicPrice(): Money {
    let moneyAmount = this.money.amount;
    this.toArray().map(t => t.getBasicPrice().amount).forEach(a => moneyAmount += a);
    return new Money(moneyAmount);
  }

  public getTowns(): Town[] {
    return this.toArray()
        .filter(t => t instanceof Town)
        .map(t => <Town> t);
  }

  public getUtilities(): Utility[] {
    return this.toArray()
        .filter(t => t instanceof Utility)
        .map(u => <Utility> u);
  }

  public getImprovements(): Improvement[] {
    return this.toArray()
        .filter(t => t instanceof Improvement)
        .map(t => <Improvement> t);
  }

  public getDiscounts(): Discount[] {
    return this.toArray()
        .filter(t => t instanceof Discount)
        .map(t => <Discount> t);
  }

}
