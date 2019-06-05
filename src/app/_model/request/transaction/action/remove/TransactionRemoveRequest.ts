import {TransactionActionRequest} from "../TransactionActionRequest";

export abstract class TransactionRemoveRequest extends TransactionActionRequest {


    public readonly transaction_remove_type: string;

    protected constructor(type: string) {
        super("remove");
        this.transaction_remove_type = type;
    }

    static instanceOf(o: any): boolean {
        if(o == null) return false;

        let r: TransactionRemoveRequest = <TransactionRemoveRequest> o;

        return super.instanceOf(r) && r.transaction_action_type === "remove";
    }

}
