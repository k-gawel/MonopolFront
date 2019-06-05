import {GameActionRequest} from "./GameActionRequest";

export class DiceRollRequest extends GameActionRequest {

    constructor() {
        super("dice_roll");
    }

    static instanceOf(o: any): boolean {
        if(o == null) return false;

        let r: DiceRollRequest = <DiceRollRequest> o;

        return super.instanceOf(o) && r.game_action_type === "dice_roll";
    }

}
