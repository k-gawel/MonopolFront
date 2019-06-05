import {Component, Input, OnInit} from '@angular/core';
import {Utility} from "../../../../_model/instance/properties/transferable/Utility";
import {Tour} from "../../../../_model/instance/utils/Tour";
import {InfoCardService} from "../../../../_service/game/field-info/info-card.service";
import {Instance} from "../../../../_model/instance/utils/AbstractInstance";
import {Player} from "../../../../_model/instance/Player";

@Component({
  selector: 'app-utility-info',
  templateUrl: './utility-info.component.html',
  styleUrls: ['./utility-info.component.css']
})
export class UtilityInfoComponent implements OnInit {

  @Input() utility: Utility;
  currentAction: Tour;


  constructor(private service: InfoCardService) {
  }

  ngOnInit() {
  }

  back() {
    this.service.setField(null);
  }

  select(i: Instance) {
    this.service.setField(i);
  }

  getPlayers(): Player[] {
    return Player.ALL.toArray();
  }

  get



}
