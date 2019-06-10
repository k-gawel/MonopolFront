import {PlayerLeaveResponse} from "../../response/player/PlayerLeaveResponse";

export class PlayerLeaveResponseBuilder {

    static get(json: JSON): PlayerLeaveResponse {
        let result = new PlayerLeaveResponse();

        result.aborted = json['aborted'];
        result.new_admin = json['new_admin'];
        result.winner = json['winner'];
        result.loser  = json['loser'];

        return result;
    }

}
