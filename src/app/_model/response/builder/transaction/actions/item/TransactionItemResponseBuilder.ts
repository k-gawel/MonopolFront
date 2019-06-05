import {TransactionItemResponse} from "../../../../response/transaction/actions/item/TransactionItemResponse";
import {TransactionAddResponseBuilder} from "./TransactionAddResponseBuilder";
import {TransactionRemoveResponseBuilder} from "./TransactionRemoveResponseBuilder";

export class TransactionItemResponseBuilder {

    static get(json: JSON): TransactionItemResponse {
        let result: TransactionItemResponse = this.getType(json);

        return result;
    }


    protected static getType(json: JSON): TransactionItemResponse {
        let type = json['transaction_item_action'];

        switch (type) {
            case "add":
                return TransactionAddResponseBuilder.get(json);
            case "remove":
                return TransactionRemoveResponseBuilder.get(json);
            default:
                throw new Error("Wrong transaction item action type: " + type);
        }

    }

}
