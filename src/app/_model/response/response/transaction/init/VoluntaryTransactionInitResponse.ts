import {TransactionInitResponse} from "./TransactionInitResponse";

export class VoluntaryTransactionInitResponse extends TransactionInitResponse {

    public constructor() {
        super("voluntary");
    }

    static instanceOf(o: any): boolean {
        if(o === undefined) return false;

        let r: VoluntaryTransactionInitResponse = <VoluntaryTransactionInitResponse> o;

        return TransactionInitResponse.instanceOf(r)
            && r.transaction_init_type === "voluntary";
    }

}
