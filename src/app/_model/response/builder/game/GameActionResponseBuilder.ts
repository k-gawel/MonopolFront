import {GameActionResponse} from "../../response/game/GameActionResponse";
import {NewPlayerResponseBuilder} from "./NewPlayerResponseBuilder";
import {NewTourResponseBuilder} from "./NewTourResponseBuilder";
import {ChatMessageResponseBuilder} from "./ChatMessageResponseBuilder";

export class GameActionResponseBuilder {

    static get(json: JSON): GameActionResponse {
        let result: GameActionResponse = this.getType(json);
        return result;
    }


    protected static getType(json: JSON): GameActionResponse {
        switch (json['game_action_type']) {
            case "new_player":
                return NewPlayerResponseBuilder.get(json);
            case "new_tour":
                return NewTourResponseBuilder.get(json);
            case "chat":
                return ChatMessageResponseBuilder.get(json);
            default:
                throw new Error("Wrong type " + json['game_action_type']);
        }
    }


}
