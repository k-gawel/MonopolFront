import {TransactionResponse} from "../TransactionResponse";
import {Money} from "../../../../instance/properties/transferable/Money";

export class TransactionResultResponse extends TransactionResponse {

    public initiator: string;
    public invited: string;

    public initiatorMoney: Money;
    public invitedMoney: Money;

    public initiatorOffer: string[];
    public invitedOffer: string[];

    public constructor() {
        super("result");
    }

    static instanceOf(o: any): boolean {
        if(o === undefined) return false;

        let r: TransactionResultResponse = <TransactionResultResponse> o;

        return TransactionResponse.instanceOf(r)
            && r.transaction_response_type === "result"
            && typeof r.initiator === "string" && typeof r.invited === "string"
            && Money.instanceOf(r.initiatorMoney) && Money.instanceOf(r.invitedMoney)
            && r.initiatorOffer instanceof Array && r.invitedOffer instanceof Array;
    }

}
