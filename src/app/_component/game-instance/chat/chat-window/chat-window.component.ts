import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Tour} from "../../../../_model/instance/utils/Tour";
import {GameService} from "../../../../_service/game/game/game.service";
import {ChatService} from "../../../../_service/game/chat/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  @ViewChild('chatContainer') private chatContainer: ElementRef;

  constructor(private gameService: GameService,
              private chatService: ChatService) {
  }

  messagesarray: any[] = [];

  currentTour: Tour;

  newMessage: string;

  ngOnInit() {
    this.gameService.$currentTour.subscribe(t => this.currentTour = t);
    this.chatService.$message.subscribe(m => {
      this.messagesarray.push(m);
      setTimeout(() => this.scrollToBottom(), 50);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = null;
  }

  scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (e) {
      console.log("ERROR SCROLL", e);
    }
  }

}
