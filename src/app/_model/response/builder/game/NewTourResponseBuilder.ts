import {NewTourResponse} from "../../response/game/NewTourResponse";
import {Tour} from "../../../instance/utils/Tour";

export class NewTourResponseBuilder {

    static get(json: JSON): NewTourResponse {
        let result: NewTourResponse = new NewTourResponse();
        result.tour = Tour.get(json['new_tour']);
        return result;
    }

}
