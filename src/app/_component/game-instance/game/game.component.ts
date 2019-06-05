import {Component, Input, OnInit} from '@angular/core';
// @ts-ignore
import {Board} from '../../../_model/board/Board';
import {Player} from '../../../_model/instance/Player';
import {WebSocketService} from "../../../_service/utils/web-socket/web-socket.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  constructor() {
  }

  @Input() set board(value: Board) {
      this._board = value;
      this.players = Player.ALL.toArray();
  }


  _board: Board;

  players: Player[];

}

