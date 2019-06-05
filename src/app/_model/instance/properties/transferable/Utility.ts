import {AbstractInstance, InstancesList} from "../../utils/AbstractInstance";
import {Transferable} from "../../interfaces/Transferable";
import {Bank, Player} from "../../Player";
import {Money} from "./Money";
import {AbstractTransferable} from "./AbstractTransferable";
import {Chargeable} from "../../interfaces/Chargeable";

export class Utility extends AbstractTransferable implements Transferable, Chargeable {

  owner: Player;
  region: UtilityRegion;
  name: string;
  price: number;

  constructor(ref: string) {
    super(ref);
    Utility.ALL.push(this);
  }

  static ALL: InstancesList<Utility> = new InstancesList();

  static get(ref: string | JSON): Utility {
    if(typeof ref === 'string')
      return this.ALL.getByUUID(ref);

    let json: JSON = <JSON> ref;
    let result: Utility = this.ALL.getByUUID(json['uuid']);
    result = result == null ? new Utility(json['uuid']) : result;

    result.owner = Player.get(json['owner']);
    result.owner.properties.push(result);
    result.region = UtilityRegion.get(json['region']);
    result.name = json['name'];
    result.price = json['price'];

    return result;
  }


  getCharge(improvementsSize: number) {
    return this.chargeOf(this.region.ofPlayer(this.owner));
  }

  chargeOf(utilitiesOfRegion: number): Money {
    let charge = this.region.ofPlayer(this.owner) / 4 * this.price;
    let result = new Money();
    result.amount = charge;
    return result;
  }

  maxCharge() {
    return this.getCharge(4);
  }

  getBasicPrice(): Money {
    let result = new Money();
    result.amount = this.price;
    return result;
  }

  getOwner(): Player {
    return this.owner;
  }

  canBeTransferred(sender: Player, receiver: Player): boolean {
    return sender.equals(this.owner);
  }

  transfer(sender: Player, receiver: Player) {
    this.owner = receiver;
    sender.properties.remove(this);
    receiver.properties.push(this);
  }



  toString(): string {
    return this.name;
  }

}


export class UtilityRegion extends AbstractInstance {

  name: string;
  utilities: InstancesList<Utility> = new InstancesList();

  constructor(uuid: string) {
    super(uuid);
    UtilityRegion.ALL.push(this);
  }

  chargeOf(utilities: number): number {
    return 0;
  }

  static ALL: InstancesList<UtilityRegion> = new InstancesList();

  static get(ref: JSON | string): UtilityRegion {
    if(typeof ref === 'string')
      return this.ALL.getByUUID(ref);

    let json: JSON = <JSON> ref;
    let result: UtilityRegion = this.ALL.getByUUID(json['uuid']);
    result = result == null ? new UtilityRegion(json['uuid']) : result;

    result.name = json['name'];
    (<JSON[]> json['utilities']).forEach(j => result.utilities.push(Utility.get(j)));

    return result;
  }

  public ofPlayer(p: Player): number {
    if(p.isBank())
      return 0;

    return this.utilities.toArray().filter(u => u.getOwner().equals(p)).length;
  }


  toString(): string {
    return this.name;
  }

}
