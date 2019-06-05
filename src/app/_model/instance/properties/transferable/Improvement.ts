import {AbstractInstance, InstancesList} from "../../utils/AbstractInstance";
import {Transferable} from "../../interfaces/Transferable";
import {Bank, Player} from "../../Player";
import {Money} from "./Money";
import {Town} from "./Town";
import {AbstractTransferable} from "./AbstractTransferable";

export class Improvement extends AbstractTransferable implements Transferable {

  private owner: Player;
  private town: Town;

  constructor(uuid: string) {
    super(uuid);
    Improvement.ALL.push(this);
  }

  static ALL: InstancesList<Improvement> = new InstancesList();

  static get(ref: JSON | string): Improvement {
    if(typeof ref === 'string')
      return this.ALL.getByUUID(ref);

    let json: JSON = <JSON> ref;
    let result: Improvement = this.ALL.getByUUID(json['uuid']);
    result = result == null ? new Improvement(json['uuid']) : result;

    result.owner = Player.get(json['owner']);
    result.owner.properties.push(result);
    result.town = Town.get(json['town']);

    return result;
  }

  getTown(): Town {
    return this.town;
  }

  canBeTransferred(sender: Player, receiver: Player): boolean {
    let senderIsOwner = sender.equals(this.owner);
    if(sender.isBank())
      return senderIsOwner && this.town.improvements.size() < 5;

    return senderIsOwner;
  }

  getBasicPrice(): Money {
    let townHalfPrice: number = this.town.price / 2;
    let improvementPrice = (townHalfPrice + 49)/50 * 50;

    let result: Money = new Money();
    result.amount = townHalfPrice + improvementPrice;
    return result;
  }

  getOwner(): Player {
    return this.owner;
  }

  transfer(sender: Player, receiver: Player) {

    if(sender.isBank()) {
      this.owner = receiver;
      this.town.improvements.push(this);
      this.owner.properties.push(this);
    }
    else {
      this.owner = null;
      this.town.improvements.remove(this);
      this.owner.properties.remove(this);
      receiver.properties.push(this.getBasicPrice());
    }

  }

  toString(): string {
    return '<i class="fas fa-home"></i> IN ' + this.town.toString();
  }



}
