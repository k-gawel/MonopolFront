import {TransactionInitResponse} from "../../../response/transaction/init/TransactionInitResponse";
import {CompulsoryTransactionInitResponseBuilder} from "./CompulsoryTransactionInitResponseBuilder";
import {BankTransactionInitResponseBuilder} from "./BankTransactionInitResponseBuilder";
import {VoluntaryTransactionInitResponseBuilder} from "./VoluntaryTransactionInitResponseBuilder";
import {PropertyTransactionOperations} from "../../../response/transaction/actions/TransactionActionResponse";

export class TransactionInitResponseBuilder {

    static get(json: JSON): TransactionInitResponse {
        let result: TransactionInitResponse = this.getType(json);

        result.initiator = json['initiator'];
        result.invited = json['invited'];

        result.operations = (<JSON[]> json['operations'])
            .map(j => new PropertyTransactionOperations(j));


        return result;
    }


    static getType(json: JSON): TransactionInitResponse {
        let type = json['transaction_init_type'];

        switch (type) {
            case "bank":
                return BankTransactionInitResponseBuilder.get(json);
            case "compulsory":
                return CompulsoryTransactionInitResponseBuilder.get(json);
            case "voluntary":
                return VoluntaryTransactionInitResponseBuilder.get(json);
            default:
                throw new Error("Wrong type of transaction init response: " + type);
        }

    }

}
