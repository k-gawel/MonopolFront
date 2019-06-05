import {TransactionAddRequest} from "./TransactionAddRequest";

export class TransactionAddMoneyRequest extends TransactionAddRequest {

    public amount: number;

    public constructor() {
        super("money");
    }

    static instanceOf(o: any): boolean {
        if(o == null) return false;

        let r: TransactionAddMoneyRequest = <TransactionAddMoneyRequest> o;

        return super.instanceOf(r) && r.transaction_add_type === "money";
    }

}
