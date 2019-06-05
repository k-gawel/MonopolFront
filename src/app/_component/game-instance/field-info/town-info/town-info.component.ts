import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../../../_model/instance/utils/Tour";
import {Town} from "../../../../_model/instance/properties/transferable/Town";
import {InfoCardService} from "../../../../_service/game/field-info/info-card.service";
import {Player} from "../../../../_model/instance/Player";

@Component({
  selector: 'app-town-info',
  templateUrl: './town-info.component.html',
  styleUrls: ['./town-info.component.css']
})
export class TownInfoComponent implements OnInit {

  @Input() town: Town;
  currentAction: Tour;

  constructor(private service: InfoCardService) { }

  ngOnInit() {
  }

  back() {
    this.service.setField(null);
  }

  getPlayers(): Player[] {
    return Player.ALL.toArray()
        .filter(p => !p.isBank())
  }

}
