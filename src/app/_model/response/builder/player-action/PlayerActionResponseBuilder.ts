import {PlayerActionResponse} from "../../response/player/PlayerActionResponse";
import {PlayerLeaveResponseBuilder} from "./PlayerLeaveResponseBuilder";
import {PlayerMoveResponseBuilder} from "./PlayerMoveResponseBuilder";

export class PlayerActionResponseBuilder {


    public static get(json: JSON): PlayerActionResponse {
        let result = this.getType(json);

        result.playerUuid = json['player_uuid'];

        return result;
    }


    protected static getType(json: JSON): PlayerActionResponse {
        let type = json['player_action_type'];

        switch (type) {
            case "leave":
                return PlayerLeaveResponseBuilder.get(json);
            case "move":
                return PlayerMoveResponseBuilder.get(json);
            default:
                throw new Error("Wrong player action type: " + type);
        }

    }

}
