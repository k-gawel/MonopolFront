import {Component, OnInit} from '@angular/core';
import {Board} from "./_model/board/Board";
import {SessionService} from "./_service/utils/cookies/session-service";
import {GameService} from "./_service/game/game/game.service";
import {WebSocketService} from "./_service/utils/web-socket/web-socket.service";
import {ResponseService} from "./_service/response/response/response.service";
// import {GameService} from "./_service/game/game/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private gameService: GameService,
              private webSocketService: WebSocketService,
              private responseService: ResponseService) {
  }

  currentBoard: Board;

  ngOnInit(): void {
    this.webSocketService.$message
        .subscribe(m => this.responseService.receiveMessage(m));

    this.gameService.$board.subscribe(b => {
      this.currentBoard = b;
    });

    this.gameService.getExistingGame();
  }


}
