import {Field} from "./Field";
import {InstancesList} from "../instance/utils/AbstractInstance";
import {Player} from "../instance/Player";
import {Utility} from "../instance/properties/transferable/Utility";
import {CardGroup} from "../instance/properties/CardGroup";
import {Town} from "../instance/properties/transferable/Town";

export class Board extends InstancesList<Field> {

  static get(json: JSON[]): Board {
    if(json == undefined) return;

    let result = new Board();

    (<JSON[]> json['fields']).forEach(f => result.addField(Field.get(f)));

    return result;
  }

  addField(field: Field) {
    for (let f of this.list) {
      if(f.index === field.index) {
        f = field;
        return;
      }
    }

    this.push(field);
  }

  getByIndex(index: number): Field {
    return this.list.find(f => f.index === index);
  }

  getByPlayer(player: Player): Field {
    return this.list.find(f => f.containsPlayer(player));
  }

  getByLandable(landable: Town | Utility | CardGroup) {
    return this.list.find(f => f.getProperty().equals(landable));
  }

  movePlayer(player: Player, destination: Field) {
    this.getByPlayer(player).removePlayer(player);
    destination.putPlayer(player);
  }

  putPlayer(player: Player) {
    this.getByIndex(0).putPlayer(player);
  }

  removePlayer(player: Player) {
    this.getByPlayer(player).removePlayer(player);
  }

}
