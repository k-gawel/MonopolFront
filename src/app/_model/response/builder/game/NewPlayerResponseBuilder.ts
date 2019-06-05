import {Player} from "../../../instance/Player";
import {NewPlayerResponse} from "../../response/game/NewPlayerResponse";

export class NewPlayerResponseBuilder {


    static get(json: JSON): NewPlayerResponse {
        let result: NewPlayerResponse = new NewPlayerResponse();

        result.player = Player.get(json['player']);

        return result;
    }

}
