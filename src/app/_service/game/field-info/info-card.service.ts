import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Field} from "../../../_model/board/Field";
import {AbstractInstance} from "../../../_model/instance/utils/AbstractInstance";
import {InstanceHighlightService} from "../game/instance-highlight.service";

@Injectable({
  providedIn: 'root'
})
export class InfoCardService {

  constructor(private highlightService: InstanceHighlightService) { }

  public $instance: Subject<AbstractInstance> = new Subject();

  public setField(instance: AbstractInstance) {
    this.highlightService.highlight(instance, true);

    if(instance instanceof Field)
      this.$instance.next(instance.getProperty());
    else
      this.$instance.next(instance);
  }

}
