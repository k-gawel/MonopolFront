import {AbstractInstance, InstancesList} from "../utils/AbstractInstance";

export class CardGroup extends AbstractInstance {

  cardName: string;
  description: string;

  constructor(uuid: string) {
    super(uuid);
    CardGroup.ALL.push(this);
  }

  static ALL: InstancesList<CardGroup> = new InstancesList();

  static get(ref: string | JSON): CardGroup {
    if(typeof ref === 'string')
      return this.ALL.getByUUID(ref);

    let json: JSON = <JSON> ref;
    let result = this.ALL.getByUUID(json['uuid']);
    result = result == null ? new CardGroup(json['uuid']) : result;

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

  toString(): string {
    return this.cardName;
  }

}
