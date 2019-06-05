import {PlayerMoveResponse} from "../../response/player/PlayerMoveResponse";

export class PlayerMoveResponseBuilder {

    static get(json: JSON): PlayerMoveResponse {
        let result = new PlayerMoveResponse();

        result.destination = json['destination'];

        return result;
    }

}
