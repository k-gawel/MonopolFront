import {Component, Input, OnInit} from '@angular/core';
import {CardGroupField, Field, TownField, UtilityField} from "../../../../_model/board/Field";
import {InfoCardService} from "../../../../_service/game/field-info/info-card.service";
import {TransactionService} from "../../../../_service/game/transaction/transaction.service";
import {Transferable} from "../../../../_model/instance/interfaces/Transferable";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input() field: Field;

  type: string = "NONE";

  constructor(private fieldInfoService: InfoCardService,
              private transactionService: TransactionService) { }

  ngOnInit() {
    if(this.field instanceof TownField)
      this.type = "TOWN";
    else if(this.field instanceof UtilityField)
      this.type = "UTILITY";
    else if(this.field instanceof CardGroupField)
      this.type = "CARD_GROUP";
    else
      throw new Error("Field is type of none" + this.field);
  }

  select(field: Field) {
    this.fieldInfoService.setField(field);
  }

  canBeAddedToTransaction(): boolean | null {
    let currentTransaction = this.transactionService.$transaction.value;
    if(currentTransaction == null)
      return null;

    if(this.type === "NONE" || this.type === "CARD_GROUP")
      return false;

    return (<Transferable> this.field.getProperty()).addProperty();
  }
}
