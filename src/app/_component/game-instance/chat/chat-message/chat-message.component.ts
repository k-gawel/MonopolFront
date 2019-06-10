import {Component, Input, OnInit} from '@angular/core';
import {Bank, Player} from "../../../../_model/instance/Player";
import {AbstractInstance, Instance} from "../../../../_model/instance/utils/AbstractInstance";
import {type} from "os";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() messageArray: any[];

  constructor() { }

  ngOnInit() {
  }

  isInstance(m: any): boolean {
    return m instanceof AbstractInstance;
  }

  isString(m: any): boolean {
    return typeof m === 'string';
  }

  isAuthor(m: any): boolean {
    return this.messageArray.indexOf(m) === 0 && m instanceof Player;
  }




}
