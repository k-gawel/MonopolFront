import {Component, Input, OnInit} from '@angular/core';
import {Utility} from "../../../../_model/instance/properties/transferable/Utility";

@Component({
  selector: 'app-utility-field',
  templateUrl: './utility-field.component.html',
  styleUrls: ['./utility-field.component.css']
})
export class UtilityFieldComponent implements OnInit {

  @Input() utility: Utility;

  constructor() { }

  ngOnInit() {
  }

  getIconName(): string {
    let uppName = this.utility.region.name.toUpperCase();
    if(uppName.includes("RAIL"))
      return "rails";
    else if(uppName.includes("ELECTR"))
      return "power-works";
    else if(uppName.includes("WATER"))
      return "waterworks";
    else
      return null;
  }



}
