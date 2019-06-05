import {TransactionResponse} from "../../response/transaction/TransactionResponse";
import {TransactionActionResponseBuilder} from "./actions/TransactionActionResponseBuilder";
import {TransactionInitResponseBuilder} from "./init/TransactionInitResponseBuilder";
import {TransactionResultResponseBuilder} from "./result/TransactionResultResponseBuilder";

export class TransactionResponseBuilder {

    static get(json: JSON): TransactionResponse {
        let result: TransactionResponse = this.getType(json);

        result.transaction = json['transaction'];

        return result;
    }


    protected static getType(json: JSON): TransactionResponse {

        switch (json['transaction_response_type']) {
            case 'action':
                return TransactionActionResponseBuilder.get(json);
            case 'init':
                return TransactionInitResponseBuilder.get(json);
            case 'result':
                return TransactionResultResponseBuilder.get(json);
            default:
                throw new Error("Wrong type of transaction response: " + json['transaction_action_response']);
        }

    }

}
