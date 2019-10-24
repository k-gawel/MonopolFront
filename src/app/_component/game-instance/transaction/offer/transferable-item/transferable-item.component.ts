import {Component, HostListener, Input, OnInit, SystemJsNgModuleLoader} from '@angular/core';
import {Transferable} from "../../../../../_model/instance/interfaces/Transferable";
import {Transaction} from "../../../../../_model/instance/utils/transaction/Transaction";
import {TransactionRequestService} from "../../../../../_service/request/transaction/transaction-request.service";
import {Town} from "../../../../../_model/instance/properties/transferable/Town";
import {Utility} from "../../../../../_model/instance/properties/transferable/Utility";
import {Improvement} from "../../../../../_model/instance/properties/transferable/Improvement";
import {InfoCardService} from "../../../../../_service/game/field-info/info-card.service";
import {Discount} from "../../../../../_model/instance/properties/transferable/Discount";

@Component({
  selector: 'app-transferable-item',
  templateUrl: './transferable-item.component.html',
  styleUrls: ['./transferable-item.component.css']
})
export class TransferableItemComponent implements OnInit {

  @Input() transferable: Transferable;
  @Input() transaction: Transaction;
  @Input() show: boolean;


  constructor(private requestService: TransactionRequestService,
              private infoService: InfoCardService) { }
  name: string;
  subname: string;
  price: string;

  @HostListener('click') onClick() {
    this.infoService.setField(this.transferable);
  }

  addItem() {
    this.requestService.addExistingTransferable(<Town | Utility | Improvement> this.transferable);
  }

  removeItem() {
    this.requestService.removeItem(this.transferable);
  }

  ngOnInit() {
    if(this.transferable instanceof Town)
      this.describeTown(this.transferable);
    else if(this.transferable instanceof Utility)
      this.describeUtility(this.transferable);
    else if(this.transferable instanceof Improvement)
      this.describeImprovement(this.transferable);
    else if(this.transferable instanceof Discount)
      this.describeDiscount(this.transferable);
    else this.show = false;
  }

  describeImprovement(improvement: Improvement) {
    this.name = "IMPROVEMENT";
    this.subname = improvement.getTown().name;
    this.price = improvement.getBasicPrice().toString();
  }

  describeTown(town: Town) {
    this.name = town.name;
    this.subname = town.region.name;
    this.price = town.getBasicPrice().toString();
  }

  describeUtility(utility: Utility) {
    this.name = utility.name;
    this.subname = utility.region.name;
    this.price = utility.getBasicPrice().toString();
  }

  describeDiscount(discount: Discount) {
    this.name = discount.getValueString() + " until T" + discount.endTour;
    this.subname = discount.chargeable.name;
  }

}
