import {Component, Input, OnInit} from '@angular/core';
import {CardGroup} from "../../../../_model/instance/properties/CardGroup";

@Component({
  selector: 'app-card-field',
  templateUrl: './card-field.component.html',
  styleUrls: ['./card-field.component.css']
})
export class CardFieldComponent implements OnInit {

  @Input() card: CardGroup;

  constructor() { }

  ngOnInit() {
  }

  getIcon(): string {

    let uppName = this.card.cardName.toUpperCase();

    if(uppName.includes("CHANCE"))
      return 'chance';
    else if(uppName.includes("JAIL"))
      return 'court';
    else if(uppName.includes("POLICE"))
      return 'patrol';
    else if(uppName.includes("COMMUNITY"))
      return 'community-chest';
    else if(uppName.includes("LUXURY"))
      return 'luxury-tax';
    else if(uppName.includes("INCOME"))
      return 'income-tax';
    else if(uppName.includes("START"))
      return 'start';
  }

}
