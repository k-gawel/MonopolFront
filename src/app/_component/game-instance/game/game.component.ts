import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
// @ts-ignore
import {Board} from '../../../_model/board/Board';
import {Player} from '../../../_model/instance/Player';
import {WebSocketService} from "../../../_service/utils/web-socket/web-socket.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {MatTab, MatTabGroup} from "@angular/material";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

    transaction: boolean = true;

    _board: Board;

    players: Player[];

    constructor() {
    }

    @Input() set board(value: Board) {
        if(value == null) {
            console.log("Board is null");
            return;
        } else {
            console.log("Board is not null", value);
            this._board = value;
            this.players = Player.ACTIVE.array;
        }
    }

}

