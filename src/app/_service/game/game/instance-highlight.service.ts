import { Injectable } from '@angular/core';
import {Instance} from "../../../_model/instance/utils/AbstractInstance";
import {isNullOrUndefined} from "util";
import {CardGroupField, Field, TownField, UtilityField} from "../../../_model/board/Field";
import {Town} from "../../../_model/instance/properties/transferable/Town";
import {GameService} from "./game.service";
import {Board} from "../../../_model/board/Board";
import {Utility} from "../../../_model/instance/properties/transferable/Utility";
import {CardGroup} from "../../../_model/instance/properties/CardGroup";
import {Improvement} from "../../../_model/instance/properties/transferable/Improvement";
import {Discount} from "../../../_model/instance/properties/transferable/Discount";
import {RGBColor} from "../../../_model/utils/RGBColor";

@Injectable({
  providedIn: 'root'
})
export class InstanceHighlightService {

  constructor(private gameService: GameService) { }

  public highlight(instance: Instance, status: boolean) {
      if(status)
        this.cleanAll();

      let uuid = this.getFieldId(instance);
      if(uuid == null)  return;
      let field = this.getField(uuid);
      if(field == null) return;
      let icon = this.getIcon(field);
      if(icon == null)  return;

      if(status) {
          field.classList.add("field-hover");
          icon.classList.add("field-icon-hover");
          icon.style.color = this.getColor(instance).getCSS(0.5)
      } else {
          icon.style.color = this.getColor(instance).getCSS(0.2);
          field.classList.remove("field-hover");
          icon.classList.remove("field-icon-hover");
      }
  }

  
  private cleanAll() {
      Field.ALL.array.forEach(f => this.highlight(f, false));
  }

  private getFieldId(instance: Instance): string {
      let field: Field;
      if(instance instanceof Field)
          field = instance;
      else if(instance instanceof Town || instance instanceof Utility || instance instanceof CardGroup)
          field = this.board.getByLandable(instance);
      else if(instance instanceof Improvement)
          field = this.board.getByLandable(instance.getTown());
      else if(instance instanceof Discount)
          field = this.board.getByLandable(instance.chargeable);
      else
          return undefined;
      return field.uuid;
  }

  private getField(uuid: string) {
      let fields = document.getElementsByTagName("app-field");
      for(let field of fields) {
          if (field.getAttribute("field") === uuid)
              return field
      }
      return undefined;
  }

  private getIcon(field) {
      return field.getElementsByClassName("field-icon")[0];
  }

  private get board(): Board {
      return this.gameService.$board.value;
  }

  private getColor(instance: Instance): RGBColor {
      if(instance instanceof Field) {
          if(instance instanceof TownField)
              return instance.town.color;
          else if(instance instanceof UtilityField)
              return instance.utility.color;
          else if(instance instanceof CardGroupField)
              return instance.cardGroup.color;
      }
      else if(instance instanceof Town || instance instanceof Utility || instance instanceof CardGroup)
          return instance.color;
      else if(instance instanceof Improvement)
          return instance.getTown().color;
      else if(instance instanceof Discount)
          return instance.chargeable.color;
      else
          return undefined;

  }

}
