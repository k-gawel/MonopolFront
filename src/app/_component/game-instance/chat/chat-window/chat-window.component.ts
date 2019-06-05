import {Component, ElementRef, OnInit} from '@angular/core';
import {Tour} from "../../../../_model/instance/utils/Tour";
import {GameService} from "../../../../_service/game/game/game.service";
import {ChatService} from "../../../../_service/game/chat/chat.service";
import {Transferable, TransferableCollection} from "../../../../_model/instance/interfaces/Transferable";
import {AbstractTransferable} from "../../../../_model/instance/properties/transferable/AbstractTransferable";
import {Town} from "../../../../_model/instance/properties/transferable/Town";
import {Player} from "../../../../_model/instance/Player";

@Component({
  selector: 'app-chat',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  constructor(private gameService: GameService,
              private chatService: ChatService) {
  }

  messagesarray: any[] = [];

  currentTour: Tour;

  newMessage: string;

  ngOnInit() {
    this.gameService.$currentTour.subscribe(t => this.currentTour = t);
    this.chatService.$message.subscribe(m => this.messagesarray.push(m));
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = null;
  }

}
