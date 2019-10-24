import {Component, Input, OnInit} from '@angular/core';
import {Town} from "../../../../_model/instance/properties/transferable/Town";

function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

@Component({
  selector: 'app-town-field',
  templateUrl: './town-field.component.html',
  styleUrls: ['./town-field.component.css']
})
export class TownFieldComponent implements OnInit {


  @Input() town: Town;
  @Input() index: number;

  constructor() {
  }

  ngOnInit() {
  }

  get name(): string[] {
    return this.town.name.replace(" ", "").split("");
  }

  get romanIndex() {
    return romanize(this.index);
  }

}
