import {TransactionActionRequest} from "../TransactionActionRequest";

export abstract class TransactionAddRequest extends TransactionActionRequest {


    public readonly transaction_add_type: string;

    protected constructor(type: string) {
        super("add");
        this.transaction_add_type = type;
    }

    static instanceOf(o: any): boolean {
        if(o == null) return false;

        let r: TransactionAddRequest = <TransactionAddRequest> o;

        return super.instanceOf(r) && r.transaction_action_type === "offer";
    }

}
