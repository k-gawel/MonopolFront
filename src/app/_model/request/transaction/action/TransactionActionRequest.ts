import {TransactionRequest} from "../TransactionRequest";

export abstract class TransactionActionRequest extends TransactionRequest {

    public transaction: string;
    public side: string;

    public readonly transaction_action_type: string;

    protected constructor(type: string) {
        super("action");
        this.transaction_action_type = type;
    }

    static instanceOf(o: any): boolean {
        if(o == null) return false;

        let r: TransactionActionRequest = <TransactionActionRequest> o;

        return super.instanceOf(r) && r.transaction_request_type === "action";
    }

}
