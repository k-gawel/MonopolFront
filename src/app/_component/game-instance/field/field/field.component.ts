import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {CardGroupField, Field, TownField, UtilityField} from "../../../../_model/board/Field";
import {InfoCardService} from "../../../../_service/game/field-info/info-card.service";
import {TransactionService} from "../../../../_service/game/transaction/transaction.service";
import {Transferable} from "../../../../_model/instance/interfaces/Transferable";
import {CardGroup} from "../../../../_model/instance/properties/CardGroup";
import {Utility} from "../../../../_model/instance/properties/transferable/Utility";
import {NgModel} from "@angular/forms";
import {InstanceHighlightService} from "../../../../_service/game/game/instance-highlight.service";

@Component({
    selector: 'app-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

    @Input() field: Field;
    private hover: boolean = false;
    type: string = "NONE";

    constructor(private fieldInfoService: InfoCardService,
                private transactionService: TransactionService,
                private highlightService: InstanceHighlightService) { }

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

    @HostListener("click") select() {
        this.fieldInfoService.setField(this.field);
    }

    @HostListener('mouseover') mouseover() {
        this.highlightService.highlight(this.field, true);
    }

    @HostListener('mouseleave') mouseleave() {
        this.highlightService.highlight(this.field, false);
    }

    canBeAddedToTransaction(): boolean | null {
        let currentTransaction = this.transactionService.$transaction.value;
        if(currentTransaction == null) return null;

        if(this.type === "NONE" || this.type === "CARD_GROUP") return false;

        return (<Transferable> this.field.getProperty()).addProperty();
    }

    get iconColor(): string {
      return this.field.color.getCSS(this.hover ? 0.5 : 0.1);
    }

    get iconClass(): string {
        return this.icon + (this.hover ? ' field-icon-hover' : '');
    }

    private get icon(): string {
        if(this.field instanceof TownField)
          return 'city';
        else if(this.field instanceof UtilityField)
          return this.getUtilityIcon(this.field.utility);
        else if(this.field instanceof CardGroupField)
          return this.getCardIcon(this.field.cardGroup);
        else
          throw new Error("Wrong field type: " + this.field);
    }

    private getCardIcon(card: CardGroup): string {
        let uppName = card.cardName.toUpperCase();
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

    private getUtilityIcon(utility: Utility): string {
        let uppName = utility.region.name.toUpperCase();
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
