import {Player} from "../../../instance/Player";
import {GameActionResponse} from "./GameActionResponse";

export class ChatMessageResponse extends GameActionResponse {

    public player: Player;
    public message: string;

    public constructor() {
        super("chat");
    }

}
