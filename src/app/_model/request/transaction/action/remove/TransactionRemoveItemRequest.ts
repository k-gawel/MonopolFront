import {TransactionRemoveRequest} from "./TransactionRemoveRequest";

export class TransactionRemoveItemRequest extends TransactionRemoveRequest {

    public transferable: string;

    public constructor() {
        super("item");
    }

}
