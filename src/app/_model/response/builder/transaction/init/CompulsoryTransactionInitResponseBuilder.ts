import {CompulsoryTransactionInitResponse} from "../../../response/transaction/init/CompulsoryTransactionInitResponse";

export class CompulsoryTransactionInitResponseBuilder {
    static get(json: JSON): CompulsoryTransactionInitResponse {
        let result = new CompulsoryTransactionInitResponse();

        result.demand = json['demand'];

        return result;
    }
}
