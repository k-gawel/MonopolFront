import {TransactionStatusResponse} from "../../../../response/transaction/actions/status/TransactionStatusResponse";

export class TransactionStatusResponseBuilder {

    static get(json: JSON): TransactionStatusResponse {
        let result = new TransactionStatusResponse();

        result.status = json['status'];

        return result;
    }

}
