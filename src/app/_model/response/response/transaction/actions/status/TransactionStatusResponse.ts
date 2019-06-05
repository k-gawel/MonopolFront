import {TransactionActionResponse} from "../TransactionActionResponse";

export class TransactionStatusResponse extends TransactionActionResponse {

    public status: boolean;

    public constructor() {
        super("status");
    }

    static instanceOf(o: any): boolean {
        if(o === undefined)
            return false;

        let r: TransactionStatusResponse = <TransactionStatusResponse> o;

        return super.instanceOf(r)
            && typeof r.status === "boolean"
            && r.transaction_action_type === "status";
    }

}
