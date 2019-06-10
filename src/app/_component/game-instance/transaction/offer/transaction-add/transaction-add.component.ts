import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BankTransaction, Transaction} from "../../../../../_model/instance/utils/transaction/Transaction";
import {Player} from "../../../../../_model/instance/Player";
import {Town} from "../../../../../_model/instance/properties/transferable/Town";
import {TransactionRequestService} from "../../../../../_service/request/transaction/transaction-request.service";
import {Utility} from "../../../../../_model/instance/properties/transferable/Utility";
import {Improvement} from "../../../../../_model/instance/properties/transferable/Improvement";
import {GameService} from "../../../../../_service/game/game/game.service";

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {


  @Input() transaction: Transaction;
  @Input() side: Player;
  @Input() add: boolean;

  constructor(private requestService: TransactionRequestService) { }

  ngOnInit() {

  }

  newImprovementForm: Town;

  isBank(transaction?: Transaction): boolean {
    return transaction === undefined ?
        this.side.isBank() : transaction instanceof BankTransaction;
  }



  getTowns(): Town[] {
    return this.side.properties.toArray()
        .filter(p => p instanceof Town)
        .map(t => <Town> t)
        .filter(t => t.addProperty() === true);
  }

  getUtilities(): Utility[] {
    return this.side.properties.toArray()
        .filter(p => p instanceof Utility)
        .map(u => <Utility> u)
        .filter(p => p.addProperty() === true);
  }

  getImprovements(): Improvement[] {
    return this.side.properties.toArray()
        .filter(p => p instanceof Improvement)
        .map(i => <Improvement> i)
        .filter(p => p.addProperty() === true);
  }


  newImprovement() {
    this.requestService.addNewImprovement(this.side, this.newImprovementForm);
  }




}


@Component({
  selector: 'new-discount-form',
  templateUrl: './new-discount-form.component.html'
})
export class NewDiscountForm {

  constructor(private requestService: TransactionRequestService,
              private gameService: GameService) {
  }

  @Input() chargeables: (Utility|Town)[];
  @Output() close = new EventEmitter();

  chargeable: Town | Utility;
  percentage: boolean = true;
  value: number = 0;
  endTour: number = 1;

  newDiscount() {
    let currentTour = this.gameService.$currentTour.value.index;
    let tour = currentTour + this.endTour;
    this.requestService.addNewDiscount(this.chargeable, this.percentage, this.value, tour);
    this.close.emit();
  }

  formatLabel(value: number | null) {
    if(!value) return 0;

    return this.percentage ? value + "%" : "$" + value;
  }

  max() {
    if(this.chargeable == null) return 0;
    return this.percentage ? 99 : this.chargeable.maxCharge().amount
  }

  min() {
    return this.percentage ? 1 : 0;
  }


}


@Component({
  selector: 'new-improvement-form',
  templateUrl: './new-improvement-form.component.html'
})
export class NewImprovementForm {

  constructor(private requestService: TransactionRequestService) {}

  @Input() side: Player;

  getTownsThaCanBeImproved(): Town[] {
    return this.side.properties.toArray()
        .filter(p => p instanceof Town).map(p => <Town> p)
        .filter(p => this.side.equals(p.region.getOwner()))
        .filter(p => p.improvements.size() < 5);
  }

  add(town: Town) {
    this.requestService.addNewImprovement(this.side, town);
  }

}
