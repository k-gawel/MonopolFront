import {TransactionInitResponse} from "./TransactionInitResponse";

export class CompulsoryTransactionInitResponse extends TransactionInitResponse {

    public demand: number;

    public constructor() {
        super("compulsory");
    }

    static instanceOf(o: any): boolean {
        if(o === undefined) return false;

        let r: CompulsoryTransactionInitResponse = <CompulsoryTransactionInitResponse> o;

        return TransactionInitResponse.instanceOf(r)
            && typeof r.demand === "number"
            && r.transaction_init_type === "compulsory";
    }

}
