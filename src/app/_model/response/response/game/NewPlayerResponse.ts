import {GameActionResponse} from "./GameActionResponse";
import {Player} from "../../../instance/Player";

export class NewPlayerResponse extends GameActionResponse {
    public player: Player;

    public constructor() {
      super("new_player")
    }



}
