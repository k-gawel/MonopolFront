import {AbstractInstance, InstancesList} from "../instance/utils/AbstractInstance";
import {Player} from "../instance/Player";
import {Town} from "../instance/properties/transferable/Town";
import {Utility} from "../instance/properties/transferable/Utility";
import {CardGroup} from "../instance/properties/CardGroup";

export abstract class Field extends AbstractInstance {

  index: number;
  players: InstancesList<Player> = new InstancesList();

  constructor(uuid: string) {
    super(uuid);
    Field.ALL.push(this);
  }

  static ALL: InstancesList<Field> = new InstancesList();

  static get(ref: JSON | string): Field {
    if(typeof ref === 'string')
      return this.ALL.getByUUID(ref);

    let json: JSON = <JSON> ref;
    let result: Field;
    switch (json['type']) {
      case 'town_field':
        result = TownField.get(json);
        break;
      case 'utility_field':
        result = UtilityField.get(json);
        break;
      case 'card_group_field':
        result = CardGroupField.get(json);
        break;
    }

    result.index = json['number'];
    (<string[]> json['players']).forEach(uuid => result.putPlayer(Player.get(uuid)));
    return result;
  }

  abstract getProperty(): Utility | Town | CardGroup;

  containsPlayer(p: Player): boolean {
    return this.players.contains(p);
  }

  putPlayer(p: Player) {
    this.players.push(p);
  }

  removePlayer(p: Player) {
    this.players.remove(p);
  }


  toString(): string {
    return "FIELD " + this.index + ": " + this.getProperty().toString();
  }

}

export class TownField extends Field {

  town: Town;

  getProperty(): Town {
    return this.town;
  }

  static get(ref: JSON | string ): TownField {
    if(typeof ref === 'string')
      return <TownField> this.ALL.getByUUID(ref);

    let json: JSON = <JSON> ref;
    let result: TownField = <TownField> this.ALL.getByUUID(json['uuid']);
    result = result == null ? new TownField(json['uuid']) : result;

    result.town = Town.get(json['landable']);
    return result;
  }



}

export class UtilityField extends Field {

  utility: Utility;

  getProperty(): Utility {
    return this.utility;
  }

  static get(ref: JSON | string): UtilityField {
    if(typeof ref === 'string')
      return <UtilityField> this.ALL.getByUUID(ref);

    let json: JSON = <JSON> ref;
    let result: UtilityField = <UtilityField> this.ALL.getByUUID(json['uuid']);
    result = result == null ? new UtilityField(json['uuid']) : result;

    result.utility = Utility.get(json['landable']);
    return result;
  }



}

export class CardGroupField extends Field {

  cardGroup: CardGroup;

  getProperty(): CardGroup {
    return this.cardGroup;
  }

  static get(ref: JSON | string ): CardGroupField {
    if(typeof ref === 'string')
      return <CardGroupField> this.ALL.getByUUID(ref);

    let json: JSON = <JSON> ref;
    let result: CardGroupField = <CardGroupField> this.ALL.getByUUID(json['uuid']);
    result = result == null ? new CardGroupField(json['uuid']) : result;

    result.cardGroup = CardGroup.get(json['landable']);
    return result;
  }



}
