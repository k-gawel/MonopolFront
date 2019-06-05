import {ResponseMessage} from "../response/ResponseMessage";
import {PlayerActionResponseBuilder} from "./player-action/PlayerActionResponseBuilder";
import {TransactionResponseBuilder} from "./transaction/TransactionResponseBuilder";
import {GameActionResponseBuilder} from "./game/GameActionResponseBuilder";

export class ResponseMessageBuilder {

    static get(json: JSON): ResponseMessage {
        let result: ResponseMessage = ResponseMessageBuilder.getType(json);

        result.game = json['game'];

        return result;
    }

    protected static getType(json: JSON): ResponseMessage {
        switch (json['response_type']) {
            case "game_action":
                return  GameActionResponseBuilder.get(json);
            case "transaction":
                return TransactionResponseBuilder.get(json);
            case "player_action":
                return PlayerActionResponseBuilder.get(json);
            default:
                throw new Error("Wrong response type " + json['response_type']);
        }
    }

}
