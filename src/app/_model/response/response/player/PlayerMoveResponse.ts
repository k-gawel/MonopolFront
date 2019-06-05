import {PlayerActionResponse} from "./PlayerActionResponse";

export class PlayerMoveResponse extends PlayerActionResponse {

    public destination: string;

    public constructor() {
        super("move");
    }

    static instanceOf(o: any): boolean {
        if(o === undefined) return false;

        let r: PlayerMoveResponse = <PlayerMoveResponse> o;

        return PlayerActionResponse.instanceOf(r)
            && r.player_action_type === "move";
    }

}
