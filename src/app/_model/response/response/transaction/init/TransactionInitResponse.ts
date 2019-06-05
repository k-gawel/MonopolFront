import {TransactionResponse} from "../TransactionResponse";
import {PropertyTransactionOperations} from "../actions/TransactionActionResponse";

export abstract class TransactionInitResponse extends TransactionResponse {

    public initiator: string;
    public invited: string;

    public operations: PropertyTransactionOperations[];

    protected readonly transaction_init_type: string;

    protected constructor(type: string) {
        super("init");
        this.transaction_init_type = type;
    }

    static instanceOf(o: any): boolean {
        if(o === undefined)
            return false;

        let r: TransactionInitResponse = <TransactionInitResponse> o;

        return super.instanceOf(r)
            && r.transaction_response_type === "init"
            && typeof r.initiator === "string"
            && typeof r.invited === "string";
    }

}
