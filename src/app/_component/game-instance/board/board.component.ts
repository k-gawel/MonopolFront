import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../../_model/board/Board";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  _board: Board;
  @Input() set board(board: Board) {
    if(board == null) return;

    this._board = board;
  }

  getQuarter(q: number): number[] {
    if(q < 0 || q >= 4)
      throw new Error();

    let start = q * 10;
    let end = start + 10;

    let result = [];

    for(let i = start; i < end; i++)
      result.push(i);

    return result;
  }

  ngOnInit() {

  }

}
