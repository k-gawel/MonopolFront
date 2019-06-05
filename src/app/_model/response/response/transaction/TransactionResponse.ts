import {ResponseMessage} from "../ResponseMessage";

export abstract class TransactionResponse extends ResponseMessage {

    public transaction: string;

    protected readonly transaction_response_type: string;

    protected constructor(type: string) {
        super("transaction");
        this.transaction_response_type = type;
    }


    static instanceOf(o: any): boolean {
        let r: TransactionResponse = <TransactionResponse> o;

        return super.instanceOf(r)
            && typeof r.transaction === "string"
            && r.response_type === "transaction";
     }

}
