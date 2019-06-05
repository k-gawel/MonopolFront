import {TransactionAddRequest} from "./TransactionAddRequest";

export class TransactionAddExistingRequest extends TransactionAddRequest {

    public transferable: string;

    public constructor() {
        super("existing");
    }

    static instanceOf(o: any): boolean {
        if(o == null) return false;

        let r: TransactionAddExistingRequest = <TransactionAddExistingRequest> o;

        return super.instanceOf(r) && r.transaction_add_type === "existing";
    }

}
