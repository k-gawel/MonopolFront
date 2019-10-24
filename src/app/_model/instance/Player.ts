import {AbstractInstance, InstancesList} from "./utils/AbstractInstance";
import {TransferableCollection} from "./interfaces/Transferable";
import {Money} from "./properties/transferable/Money";

export class Player extends AbstractInstance {

  static ADMIN: string;

  name: string;
  color: string;
  properties: TransferableCollection = new TransferableCollection();
  status: boolean = true;

  constructor(uuid: string) {
    super(uuid);
    Player.ALL.push(this);
  }

  static get ACTIVE(): InstancesList<Player> {
    let result = new InstancesList<Player>();
    this.ALL.array.filter(p => p.status).forEach(p => result.push(p));
    return result;
  }

  static ALL: InstancesList<Player> = new InstancesList();

  static getAdmin(): Player {
    return this.ALL.getByUUID(this.ADMIN);
  }

  static isAdmin(player: Player): boolean {
    return player.equals(this.getAdmin());
  }

  static get(ref: string | JSON): Player {
    if(ref == null) return null;
    if(typeof ref === 'string') return this.ALL.getByUUID(ref);

    let json: JSON = <JSON> ref;

    let result: Player = this.ALL.getByUUID(json['uuid']);
    if(result == null)
      result = json['type'] === 'bank' ? new Bank(json['uuid']) : new Player(json['uuid']);

    result.name = json['name'];
    result.color = json['color'] != undefined ? json['color'] : 'white';
    Money.get(json['money']);

    return result;
  }

  isBank(): boolean {
    return this instanceof Bank;
  }

  public toColoredString(): string {
    return "<span style=\"color: " + this.color + "\">"+ this.name +"</span>";
  }

  toString(): string {
    return this.name;
  }

}


export class Bank extends Player {

  static get(): Bank {

    return <Bank> Player.ALL.array[0];
  }



}
