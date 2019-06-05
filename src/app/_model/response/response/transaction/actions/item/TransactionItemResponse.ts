import {TransactionActionResponse} from "../TransactionActionResponse";

export abstract class TransactionItemResponse extends TransactionActionResponse {

    protected readonly transaction_item_action: string;

    protected constructor(type: string) {
        super("item");
        this.transaction_item_action = type;
    }

    static instanceOf(o: any): boolean {
        if(o === undefined) return false;

        let r: TransactionItemResponse = <TransactionItemResponse> o;

        return super.instanceOf(r)
            && r.transaction_action_type === "item";
    }

}
