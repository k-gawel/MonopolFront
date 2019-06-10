import {Component, OnInit} from '@angular/core';
import {InfoCardService} from "../../../../_service/game/field-info/info-card.service";
import {Utility} from "../../../../_model/instance/properties/transferable/Utility";
import {CardGroup} from "../../../../_model/instance/properties/CardGroup";
import {Town} from "../../../../_model/instance/properties/transferable/Town";
import {Player} from "../../../../_model/instance/Player";
import {AbstractInstance, Instance} from "../../../../_model/instance/utils/AbstractInstance";

@Component({
  selector: 'app-field-info',
  templateUrl: './field-info.component.html',
  styleUrls: ['./field-info.component.css']
})
export class FieldInfoComponent implements OnInit {

  constructor(private service: InfoCardService) { }

  instance: Instance;
  type: string = "NONE";

  ngOnInit() {
    this.service.$instance.subscribe(instance => {
      if(instance instanceof Player)
        this.type = 'PLAYER';
      else if(instance instanceof Town)
        this.type = "TOWN";
      else if(instance instanceof Utility)
        this.type = "UTILITY";
      else if(instance instanceof CardGroup)
        this.type = "CARD_GROUP";
      else
        this.type = "NONE";

      this.instance = instance;
    })
  }

  select(i: AbstractInstance) {
    this.service.setField(i);
  }




}
