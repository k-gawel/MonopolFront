import {Component, Input, OnInit} from '@angular/core';
import {CardGroup} from "../../../../_model/instance/properties/CardGroup";
import {Tour} from "../../../../_model/instance/utils/Tour";
import {InfoCardService} from "../../../../_service/game/field-info/info-card.service";

@Component({
  selector: 'app-card-group-info',
  templateUrl: './card-group-info.component.html',
  styleUrls: ['./card-group-info.component.css']
})
export class CardGroupInfoComponent implements OnInit {

  @Input() cardGroup: CardGroup;
  @Input() currentTourAction: Tour;

  constructor(private service: InfoCardService) { }

  ngOnInit() {
  }

  back() {
    this.service.setField(null);
  }


}
