import {TransactionActionRequest} from "../TransactionActionRequest";

export class TransactionStatusRequest extends TransactionActionRequest {

    public status: boolean;

    public constructor() {
        super("status");
    }

    static instanceOf(o: any): boolean {
        if(o == null) return false;

        let r: TransactionStatusRequest = <TransactionStatusRequest> o;

        return super.instanceOf(r) && r.transaction_action_type === "existing";
    }

}
