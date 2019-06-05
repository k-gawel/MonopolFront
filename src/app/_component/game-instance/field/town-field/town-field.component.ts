import {Component, Input, OnInit} from '@angular/core';
import {Town} from "../../../../_model/instance/properties/transferable/Town";

@Component({
  selector: 'app-town-field',
  templateUrl: './town-field.component.html',
  styleUrls: ['./town-field.component.css']
})
export class TownFieldComponent implements OnInit {


  @Input() town: Town;

  constructor() {
  }

  ngOnInit() {
  }

}
