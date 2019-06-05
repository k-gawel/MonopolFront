import {RequestMessage} from "../RequestMessage";

export class ChatMessageRequest extends RequestMessage {

    public player:  string;
    public message: string;

    public constructor() {
        super("chat");
    }

}
