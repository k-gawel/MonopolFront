import {AbstractInstance, InstancesList} from "../utils/AbstractInstance";
import {RGBColor} from "../../utils/RGBColor";

export class CardGroup extends AbstractInstance {

  cardName: string;
  description: string;
  color: RGBColor;

  constructor(uuid: string) {
    super(uuid);
    CardGroup.ALL.push(this);
  }

  static ALL: InstancesList<CardGroup> = new InstancesList<CardGroup>();

  static get(ref: string | JSON): CardGroup {
    if(typeof ref === 'string')
      return this.ALL.getByUUID(ref);

    let json: JSON = <JSON> ref;
    let result = this.ALL.getByUUID(json['uuid']);
    result = result == null ? new CardGroup(json['uuid']) : result;

    result.color = new RGBColor(json['color']);
    result.cardName = json['name'];
    result.description = json['description'];

    return result;
  }

  static instanceOf(o: any): boolean {
    if(o == undefined)
      return false;

    let c: CardGroup = <CardGroup> o;

    return c.cardName !== undefined;
  }

  get simpleString(): string {
    return this.cardName.toUpperCase().split(" ").map(s => s[0]).join();
  }

  toString(): string {
    return this.cardName;
  }

}
