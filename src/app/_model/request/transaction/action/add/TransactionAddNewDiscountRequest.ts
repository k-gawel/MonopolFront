import {TransactionAddRequest} from "./TransactionAddRequest";

export class TransactionAddNewDiscountRequest extends TransactionAddRequest {

    public discount_type: string;
    public chargeable_type: string;
    public chargeable: string;
    public value: number;
    public end_tour: number;

    public constructor() {
        super("new_discount");
    }

    static instanceOf(o: any): boolean {
        if(o == null) return false;

        let r: TransactionAddNewDiscountRequest = <TransactionAddNewDiscountRequest> o;

        return super.instanceOf(r) && r.transaction_add_type === "new_discount";
    }

}
