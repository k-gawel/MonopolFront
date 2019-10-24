import {Injectable} from '@angular/core';
// import {over} from "stompjs";
// import * as SockJS from 'sockjs-client';
import {RxStompService} from "@stomp/ng2-stompjs";
import {IMessage, Message} from "@stomp/stompjs";
import {ResponseService} from "../../response/response/response.service";
import {SessionService} from "../cookies/session-service";
import {RequestMessage} from "../../../_model/request/RequestMessage";
import {Observable, Subject, Subscription} from "rxjs";
import {stringify} from "querystring";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public $message: Subject<JSON> = new Subject();
  private socketSubscription: Subscription;

  constructor(private rxStompService: RxStompService) {}


  public initSocket(gameUuid: string) {
    const url: string = "/game/".concat(gameUuid);
    this.socketSubscription = this.rxStompService.watch(url)
        .subscribe((message: Message) => {
          this.$message.next(JSON.parse(message.body))
        });
  }

  public sendRequest(message: RequestMessage) {
      let url = "/ws/game";
      this.rxStompService.publish({destination: url, body: JSON.stringify(message)});
  }

  public closeSocket() {
      this.socketSubscription.unsubscribe();
  }

}
