export abstract class ResponseMessage {

    public game: string;

    protected readonly response_type: string;

    protected constructor(responseType: string) {
        this.response_type = responseType;
    }


    static instanceOf(o: any): boolean {
        if(o == null) return false;

        let m: ResponseMessage = <ResponseMessage> o;

        return typeof m.game === "string"
            && m.response_type !== undefined;
    }

}
