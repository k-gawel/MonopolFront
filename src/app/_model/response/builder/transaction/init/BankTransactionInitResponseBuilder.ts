import {BankTransactionInitResponse} from "../../../response/transaction/init/BankTransactionInitResponse";

export class BankTransactionInitResponseBuilder {

    static get(json: JSON) {
        return new BankTransactionInitResponse();
    }

}
