import {RequestMessage} from "../RequestMessage";

export abstract class GameActionRequest extends RequestMessage {

    public readonly game_action_type: string;

    protected constructor(type: string) {
        super("action");
        this.game_action_type = type;
    }

    static instanceOf(o: any) {
        if(o == null) return false;

        let r: RequestMessage = <RequestMessage> o;

        return super.instanceOf(r) && r.request_message_type === "action";
    }

}
