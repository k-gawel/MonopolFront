import {
    PropertyTransactionOperations,
    TransactionActionResponse
} from "../../../response/transaction/actions/TransactionActionResponse";
import {TransactionItemResponseBuilder} from "./item/TransactionItemResponseBuilder";
import {TransactionStatusResponseBuilder} from "./status/TransactionStatusResponseBuilder";

export class TransactionActionResponseBuilder {


    static get(json: JSON): TransactionActionResponse {
        let result: TransactionActionResponse = this.getType(json);

        result.side = json['side'];
        result.operations = (<JSON[]> json['operations'])
            .map(j => new PropertyTransactionOperations(j));


        return result;
    }



    protected static getType(json: JSON): TransactionActionResponse {
        let type = json['transaction_action_type'];

        switch (type) {
            case "status":
                return TransactionStatusResponseBuilder.get(json);
            case "item":
                return TransactionItemResponseBuilder.get(json);
            default:
                throw new Error("Wrong transaction action type: " + type);
        }

    }


}
