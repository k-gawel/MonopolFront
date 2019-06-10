import {PlayerActionResponse} from "./PlayerActionResponse";

export class PlayerLeaveResponse extends PlayerActionResponse {

    public new_admin: string;
    public winner: string;
    public aborted: boolean;
    public loser: string;

    public constructor() {
        super("leave");
    }

    static instanceOf(o: any): boolean {
        if(o === undefined) return false;

        let r: PlayerLeaveResponse = <PlayerLeaveResponse> o;

        return PlayerActionResponse.instanceOf(r)
            && r.player_action_type === "leave";
    }

}
