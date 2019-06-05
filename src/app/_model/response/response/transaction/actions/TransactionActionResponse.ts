import {TransactionResponse} from "../TransactionResponse";

export abstract class TransactionActionResponse extends TransactionResponse {

    public side: string;
    public operations: PropertyTransactionOperations[];

    protected readonly transaction_action_type: string;

    protected constructor(type: string) {
        super("action");
        this.transaction_action_type = type;
    }

    static instanceOf(o: any): boolean {
        if(o === undefined)
            return false;

        let r: TransactionActionResponse = <TransactionActionResponse> o;

        return super.instanceOf(r) && r.side !== undefined
            && r.transaction_response_type === "action";
    }

}


export class PropertyTransactionOperations {

    public property: string;
    public add: boolean;
    public remove: boolean;

    constructor(json: JSON) {
        this.property = json['property'];
        this.add = json['add'];
        this.remove = json['remove'];
    }

    static instanceOf(o: any): boolean {
        if(o === undefined)
            return false;

        let p: PropertyTransactionOperations = <PropertyTransactionOperations> o;

        return typeof p.property === "string" && typeof p.add === "boolean"
            && typeof p.remove === "boolean";
    }

}
