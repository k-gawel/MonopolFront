import {Component, OnInit,} from '@angular/core';
import {GameLink} from "../../../_model/response/GameLink";
import {RequestService} from "../../../_service/request/request/request.service";
import {GameService} from "../../../_service/game/game/game.service";

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  constructor(private requestService: RequestService,
              private gameService: GameService) {

  }

  list: GameLink[] = [];
  name: string = '';

  ngOnInit(): void {
    this.requestService.getList().then(res => {
      this.list = res;
    })
  }

  selectGame(link: GameLink): void {
    if(this.name == null || this.name == '')
      alert("Name can't be null");
    else
      this.requestService.newPlayerGame(this.name, link.uuid)
                         .then(r => this.gameService.createGame(r));
  }

  createNewGame(): void {
    if(this.name == null || this.name == '')
      alert("Name can't be null");
    else
      this.requestService.newPlayerGame(this.name)
                         .then(r => this.gameService.createGame(r));
  }




}
