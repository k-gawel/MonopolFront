import {GameActionResponse} from "./GameActionResponse";
import {Tour} from "../../../instance/utils/Tour";

export class NewTourResponse extends GameActionResponse {

    public tour: Tour;

    constructor() {
        super("new_tour")
    }


}
