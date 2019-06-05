import {ResponseMessage} from "../ResponseMessage";

export abstract class GameActionResponse extends ResponseMessage {

    protected readonly game_action_type: string;

    protected constructor(type: string) {
        super("game_action");
        this.game_action_type = type;
    }

}
