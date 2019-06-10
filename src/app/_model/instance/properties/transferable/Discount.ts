import {AbstractInstance, InstancesList} from "../../utils/AbstractInstance";
import {Transferable} from "../../interfaces/Transferable";
import {Player} from "../../Player";
import {Money} from "./Money";
import {Town} from "./Town";
import {Utility} from "./Utility";
import {AbstractTransferable} from "./AbstractTransferable";

export abstract class Discount extends AbstractTransferable implements Transferable {

  chargeable: Town | Utility;
  owner: Player;
  endTour: number;

  constructor(uuid: string) {
    super(uuid);
    Discount.ALL.push(this);
  }

  static ALL: InstancesList<Discount> = new InstancesList();

  static get(ref: JSON | string): Discount {
    if (typeof ref === 'string')
      return this.ALL.getByUUID(ref);

    let json: JSON = <JSON>ref;
    let result: Discount = this.ALL.getByUUID(json['uuid']);
    let type = json['type'];
    let chargeableType = json['chargeable_type'];
    if (result == null)
      result = type === 'fixed' ?
        new FixedDiscount(json['uuid']) : new PercentageDiscount(json['uuid']);

    result.owner = Player.get(json['owner']);
    result.owner.properties.push(result);
    result.endTour = json['end_tour'];
    result.chargeable = chargeableType === 'town' ?
      Town.get(json['chargeable']) : Utility.get(json['chargeable']);
    result.setValue(json['value']);

    return result;
  }

  abstract setValue(value: number);

  abstract getValueString(): string;

  getBasicPrice(): Money {
    return new Money();
  }

  getOwner(): Player {
    return this.owner;
  }

  canBeTransferred(sender: Player, receiver: Player): boolean {
    return sender.equals(this.owner) && this.chargeable.getOwner().equals(sender);
  }

  transfer(sender: Player, receiver: Player) {
    this.owner = receiver;
    sender.properties.remove(this);
    receiver.properties.push(this);
  }

}



export class PercentageDiscount extends Discount {

  percentageDiscount: number;

  setValue(value: number) {
    this.percentageDiscount = value;
  }

  getValueString(): string {
    return this.percentageDiscount + "%";
  }

  toString(): string {
    return this.getValueString() + " | " + this.chargeable.name + " | " + this.endTour;
  }



}



export class FixedDiscount extends Discount {

  fixedPrice: number;

  setValue(value: number) {
    this.fixedPrice = value;
  }

  getValueString(): string {
    return "$" + this.fixedPrice;
  }

  toString(): string {
    return this.getValueString() + " | " + this.chargeable.name + " | " + this.endTour;
  }

  public static instanceOf(o: any): boolean {
    if(o == undefined) return false;

    let d: FixedDiscount = <FixedDiscount> o;

    return d.fixedPrice !== undefined;
  }

}
