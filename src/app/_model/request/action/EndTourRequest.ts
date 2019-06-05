import {GameActionRequest} from "./GameActionRequest";

export class EndTourRequest extends GameActionRequest {

    constructor() {
        super("tour_end");
    }

    static instanceOf(o: any): boolean {
        if(o == null) return false;

        let r: EndTourRequest = <EndTourRequest> o;

        return super.instanceOf(r)
            && r.game_action_type === "tour_end";
    }

}
