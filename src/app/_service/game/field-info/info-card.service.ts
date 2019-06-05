import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Field} from "../../../_model/board/Field";
import {AbstractInstance} from "../../../_model/instance/utils/AbstractInstance";

@Injectable({
  providedIn: 'root'
})
export class InfoCardService {

  constructor() { }

  public $instance: Subject<AbstractInstance> = new Subject();

  public setField(instance: AbstractInstance) {
    if(instance instanceof Field)
      this.$instance.next(instance.getProperty());
    else
      this.$instance.next(instance);
  }

}
