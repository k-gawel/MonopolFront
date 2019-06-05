import {TransactionAddResponse} from "../../../../response/transaction/actions/item/TransactionAddResponse";
import {TransferableBuilder} from "../../../../../instance/properties/transferable/TransferableBuilder";

export class TransactionAddResponseBuilder {

    static get(json: JSON): TransactionAddResponse {
        let result = new TransactionAddResponse();
        result.transferable = TransferableBuilder.get(json['transferable']);
        return result;
    }

}
