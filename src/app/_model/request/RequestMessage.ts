export abstract class RequestMessage {

    public session: string;
    public game: string;

    public readonly request_message_type: string;

    protected constructor(type: string) {
        this.request_message_type = type;
    }

    static instanceOf(o: any): boolean {
        if(o === undefined) return false;

        let r: RequestMessage = <RequestMessage> o;

        return r.session === undefined
            && r.game !== undefined
            && r.request_message_type !== undefined;
    }

}
