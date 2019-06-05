import {PlayerLeaveResponse} from "../../response/player/PlayerLeaveResponse";

export class PlayerLeaveResponseBuilder {

    static get(json: JSON): PlayerLeaveResponse {
        return new PlayerLeaveResponse();
    }

}
