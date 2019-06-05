import {TransactionRemoveResponse} from "../../../../response/transaction/actions/item/TransactionRemoveResponse";

export class TransactionRemoveResponseBuilder {

    static get(json: JSON) {
        let result = new TransactionRemoveResponse();

        result.transferable = json['transferable'];

        return result;
    }


}
