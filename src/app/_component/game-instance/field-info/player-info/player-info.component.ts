import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../../../_model/instance/Player";
import {InfoCardService} from "../../../../_service/game/field-info/info-card.service";

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {

  @Input() player: Player;

  constructor(private service: InfoCardService) { }

  ngOnInit() {
  }

  back() {
    this.service.setField(null);
  }

}
