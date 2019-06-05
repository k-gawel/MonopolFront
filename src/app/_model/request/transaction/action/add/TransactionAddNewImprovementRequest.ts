import {TransactionAddRequest} from "./TransactionAddRequest";

export class TransactionAddNewImprovementRequest extends TransactionAddRequest {

    public town: string;

    public constructor() {
        super("new_improvement");
    }

    static instanceOf(o: any): boolean {
        if(o === undefined) return false;

        let r: TransactionAddNewImprovementRequest = <TransactionAddNewImprovementRequest> o;

        return super.instanceOf(r) && r.transaction_add_type === "new_improvement";
    }

}
