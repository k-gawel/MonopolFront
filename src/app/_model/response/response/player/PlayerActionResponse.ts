import {ResponseMessage} from "../ResponseMessage";

export abstract class PlayerActionResponse extends ResponseMessage {

    public playerUuid: string;

    protected readonly player_action_type: string;

    protected constructor(type: string) {
        super("player_action");
        this.player_action_type = type;
    }

    static instanceOf(o: any): boolean {
        if(o === undefined) return false;

        let r: PlayerActionResponse = <PlayerActionResponse> o;

        return ResponseMessage.instanceOf(r)
            && r.response_type === "player_action";
    }

}
