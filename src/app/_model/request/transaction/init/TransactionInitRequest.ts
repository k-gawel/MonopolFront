import {TransactionRequest} from "../TransactionRequest";

export class TransactionInitRequest  extends TransactionRequest {

    public initiator: string;
    public invited: string;

    public constructor() {
        super("init");
    }

    static instanceOf(o: any): boolean {
        if(o == null) return false;

        let r: TransactionInitRequest = <TransactionInitRequest> o;

        return super.instanceOf(r) && r.transaction_request_type === "existing";
    }

}
