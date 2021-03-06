import {Injectable} from '@angular/core';
import {DiceRollRequest} from "../../../_model/request/action/DiceRollRequest";
import {EndTourRequest} from "../../../_model/request/action/EndTourRequest";
import {RequestService} from "../request/request.service";
import {LeaveRequest} from "../../../_model/request/action/LeaveRequest";

@Injectable({
  providedIn: 'root'
})
export class GameActionService {

  constructor(private requestService: RequestService) { }

  rollTheDice() {
    let request: DiceRollRequest = new DiceRollRequest();
    this.requestService.sendMessage(request);
  }

  endTour() {
    let request: EndTourRequest = new EndTourRequest();
    this.requestService.sendMessage(request);
  }

  leave() {
    let request = new LeaveRequest();
    this.requestService.sendMessage(request);
  }

}
