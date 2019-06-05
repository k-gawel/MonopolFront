import {ChatMessageResponse} from "../../response/game/ChatMessageResponse";
import {Player} from "../../../instance/Player";

export class ChatMessageResponseBuilder {

    public static get(json: JSON) {
        let result = new ChatMessageResponse();
        result.player  = Player.get(json['player']);
        result.message = json['message'];
        return result;
    }

}
