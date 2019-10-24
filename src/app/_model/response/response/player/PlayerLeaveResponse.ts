import {PlayerActionResponse} from "./PlayerActionResponse";

export class PlayerLeaveResponse extends PlayerActionResponse {

    public new_admin: string;
    public winner: string;
    public aborted: boolean;
    public loser: string;

    public constructor() {
        super("leave");
    }

}
