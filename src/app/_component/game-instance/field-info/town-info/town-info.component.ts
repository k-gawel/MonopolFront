import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../../../_model/instance/utils/Tour";
import {Town} from "../../../../_model/instance/properties/transferable/Town";
import {InfoCardService} from "../../../../_service/game/field-info/info-card.service";
import {Player} from "../../../../_model/instance/Player";
import {Discount} from "../../../../_model/instance/properties/transferable/Discount";

@Component({
  selector: 'app-town-info',
  templateUrl: './town-info.component.html',
  styleUrls: ['./town-info.component.css']
})
export class TownInfoComponent implements OnInit {

  @Input() town: Town;
  discounts: Discount[] = [];

  constructor(private service: InfoCardService) { }

  ngOnInit() {
    this.discounts = Player.ALL.toArray()
        .filter(p => !p.isBank())
        .map(p => p.properties.getDiscount(this.town))
        .filter(d => d != null);
  }

  back() {
    this.service.setField(null);
  }

  getPlayers(): Player[] {
    return Player.ALL.toArray()
        .filter(p => !p.isBank())
  }

}
