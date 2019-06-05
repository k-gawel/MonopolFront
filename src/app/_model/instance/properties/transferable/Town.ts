import {Bank, Player} from "../../Player";
import {AbstractInstance, InstancesList} from "../../utils/AbstractInstance";
import {Improvement} from "./Improvement";
import {Transferable} from "../../interfaces/Transferable";
import {Money} from "./Money";
import {AbstractTransferable} from "./AbstractTransferable";
import {Chargeable} from "../../interfaces/Chargeable";

export class Town extends AbstractTransferable implements Transferable, Chargeable {

  name: string;
  price: number;
  region: TownRegion;
  owner: Player;
  improvements: InstancesList<Improvement> = new InstancesList();

  static ALL: InstancesList<Town> = new InstancesList();

  constructor(uuid: string) {
    super(uuid);
    Town.ALL.push(this);
  }

  static get(refer: JSON | string): Town {
    if(typeof refer === 'string')
      return Town.ALL.getByUUID(refer);

    let json: JSON = <JSON> refer;
    let result: Town = this.ALL.getByUUID(json['uuid']);
    result = result == null ? new Town(json['uuid']) : result;

    result.name = json['name'];
    result.price = json['price'];
    result.region = TownRegion.get(json['region']);
    result.owner = Player.get(json['owner']);
    result.owner.properties.push(result);
    (<JSON[]> json['improvements'])
      .forEach(j => result.improvements.push(Improvement.get(json['improvement'])));

    return result;
  }

  getCharge(improvementsSize: number) {
    return this.chargeOf(this.improvements.size())
  }

  chargeOf(imprSize: number): Money {
    let charge: number;
    let basicPrice = this.price;

    switch (imprSize) {
      case 0:
        charge = this.region.getOwner() == null ? basicPrice / 12 : basicPrice / 8;
        break;
      case 1:
        charge = basicPrice / 3;
        break;
      case 2:
        charge = basicPrice / 2;
        break;
      case 3:
        charge = basicPrice;
        break;
      case 4:
        charge = 2 * basicPrice;
        break;
      case 5:
        charge = 3 * basicPrice;
        break;
    }

    charge = Math.floor(charge);
    let result = new Money();
    result.amount = charge;
    return result;
  }

  maxCharge() {
    return this.chargeOf(5);
  }

  getBasicPrice(): Money {
    let townPrice = this.price;
    let improvementsPrice = this.improvements.toArray()
      .map((i: Improvement) => i.getBasicPrice().amount)
      .reduce((partial_sum, a) => partial_sum + a, 0);

    let result: Money = new Money();
    result.amount = townPrice + improvementsPrice;
    return result;
  }


  getOwner(): Player {
    return this.owner;
  }


  transfer(sender: Player, receiver: Player) {
    sender.properties.remove(this);
    receiver.properties.push(this);
    this.owner = receiver;
    this.improvements.toArray().forEach(i => i.transfer(sender, receiver));
  }


  toString(): string {
    return this.name.toUpperCase();
  }


}


export class TownRegion extends AbstractInstance {

  name: string;
  color: string;
  towns: InstancesList<Town> = new InstancesList();

  constructor(uuid: string) {
    super(uuid);
    TownRegion.ALL.push(this);
  }

  static ALL: InstancesList<TownRegion> = new InstancesList();

  static get(refer: JSON | string): TownRegion {
    if(typeof refer === 'string')
      return TownRegion.ALL.getByUUID(refer);

    let json: JSON = <JSON> refer;
    let result: TownRegion = this.ALL.getByUUID(json['uuid']);
    result = result == null ? new TownRegion(json['uuid']) : result;

    result.name = json['name'];
    result.color = json['color'];
    (<JSON[]> json['towns']).forEach(j => result.towns.push(Town.get(j)));

    return result;
  }


  hasImprovementsOn(): boolean {
    return this.towns.toArray()
      .filter(t => t.improvements.size() > 0)
      .length == 0;
  }


  getOwner(): Player {
    let townsArr = this.towns.toArray();

    let firstOwner = townsArr[0].owner;

    if(firstOwner.isBank())
      return null;

    return townsArr.filter(t => t.owner.equals(firstOwner)).length === this.towns.size() ? firstOwner : null;
  }


  toString(): string {
    return this.name.toUpperCase();
  }


}
