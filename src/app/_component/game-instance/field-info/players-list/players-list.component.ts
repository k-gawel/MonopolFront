import { Component, OnInit } from '@angular/core';
import {Player} from "../../../../_model/instance/Player";
import {InfoCardService} from "../../../../_service/game/field-info/info-card.service";

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  constructor(private service: InfoCardService) { }

  ngOnInit() {
  }


  getPlayers(): Player[] {
    return Player.ALL.toArray()
        .filter(p => !p.isBank());
  }

  back() {
    this.service.setField(null);
  }

  select(p: Player) {
    this.service.setField(p);
  }

  discounts

}
