import {TransactionInitResponse} from "./TransactionInitResponse";

export class BankTransactionInitResponse extends TransactionInitResponse {

    public constructor() {
        super("bank");
    }

    static instanceOf(o: any): boolean {
        if(o === undefined)
            return false;

        let r: BankTransactionInitResponse = <BankTransactionInitResponse> o;

        return super.instanceOf(r)
            && r.transaction_init_type === "bank";
    }

}
