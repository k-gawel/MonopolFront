import {TransactionItemResponse} from "./TransactionItemResponse";

export class TransactionRemoveResponse extends TransactionItemResponse {

    public transferable: string;

    public constructor() {
        super("remove");
    }

    static instanceOf(o: any): boolean {
        if(o === undefined)
            return false;

        let r: TransactionRemoveResponse = <TransactionRemoveResponse> o;

        return TransactionItemResponse.instanceOf(r)
            && typeof r.transferable === "string"
            && r.transaction_item_action === "remove";
    }

}
