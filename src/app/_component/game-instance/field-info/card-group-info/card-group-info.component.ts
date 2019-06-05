import {Component, Input, OnInit} from '@angular/core';
import {CardGroup} from "../../../../_model/instance/properties/CardGroup";
import {Tour} from "../../../../_model/instance/utils/Tour";

@Component({
  selector: 'app-card-group-info',
  templateUrl: './card-group-info.component.html',
  styleUrls: ['./card-group-info.component.css']
})
export class CardGroupInfoComponent implements OnInit {

  @Input() cardGroup: CardGroup;
  @Input() currentTourAction: Tour;

  constructor() { }

  ngOnInit() {
  }

}
