import {RequestMessage} from "../RequestMessage";

export abstract class TransactionRequest extends RequestMessage {

    public readonly transaction_request_type: string;

    protected constructor(type: string) {
        super("transaction");
        this.transaction_request_type = type;
    }

    static instanceOf(o: any): boolean {
        if(o === undefined) return false;

        let r: TransactionRequest = <TransactionRequest> o;

        return RequestMessage.instanceOf(r)
            && r.request_message_type === "transaction";
    }

}
