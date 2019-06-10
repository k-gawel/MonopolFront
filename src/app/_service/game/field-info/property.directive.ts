import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Instance} from "../../../_model/instance/utils/AbstractInstance";
import {Transferable} from "../../../_model/instance/interfaces/Transferable";
import {Town} from "../../../_model/instance/properties/transferable/Town";
import {Utility} from "../../../_model/instance/properties/transferable/Utility";
import {Money} from "../../../_model/instance/properties/transferable/Money";
import {Improvement} from "../../../_model/instance/properties/transferable/Improvement";
import {Discount} from "../../../_model/instance/properties/transferable/Discount";
import {Player} from "../../../_model/instance/Player";
import {AbstractTransferable} from "../../../_model/instance/properties/transferable/AbstractTransferable";
import * as $ from 'jquery'
import {InfoCardService} from "./info-card.service";

@Directive({
  selector: '[appProperty]'
})
export class PropertyDirective implements OnInit {

  @Input() property: Instance;
  @Input() color: boolean = true;

  constructor(private el: ElementRef,
              private infoSevcie: InfoCardService) {
  }

  ngOnInit(): void {
    this.el.nativeElement.textContent = this.property.toString();
    this.el.nativeElement.style['font-weight'] = "bold";

    if(!this.color) return;

    if(this.property instanceof Town)
      this.el.nativeElement.style['text-shadow'] = "2px 2px 2px " + this.property.region.color;
    if(this.property instanceof Player)
      this.el.nativeElement.style['text-shadow'] = "2px 2px 2px " + this.property.color;

  }


  @HostListener('mouseenter') onMouseEnter() {
    if (this.property instanceof Player)
      this.highlihtPlayer(this.property);
    if (this.property instanceof AbstractTransferable)
      this.highlightTransferable(this.property)
  }

  @HostListener('mouseleave') onMouseLeave() {
    if(this.property instanceof AbstractTransferable)
      this.unhighlihtTransaferable(this.property);
  }

  @HostListener('click') onClick() {
    if(this.property instanceof Player || Town || Utility)
      this.infoSevcie.setField(this.property);
  }

  private highlihtPlayer(playr: Player) {

  }


  private highlightTransferable(transferable: AbstractTransferable) {
    if(transferable instanceof Money) return;

    if(transferable instanceof Improvement)
      transferable = transferable.getTown();

    if(transferable instanceof Discount)
      transferable = transferable.chargeable;

    if(transferable instanceof Town || transferable instanceof Utility) {
      let field = $("app-field[field-content='" + transferable.uuid + "'").first();
      field.addClass("field-hover");
    }
  }

  private unhighlihtTransaferable(transferable: AbstractTransferable) {
    if(transferable instanceof Money) return;

    if(transferable instanceof Improvement)
      transferable = transferable.getTown();

    if(transferable instanceof Discount)
      transferable = transferable.chargeable;

    if(transferable instanceof Town || transferable instanceof Utility) {
      let field = $("app-field[field-content='" + transferable.uuid + "'").first();
      field.removeClass("field-hover");
    }
  }

}
