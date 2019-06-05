import {VoluntaryTransactionInitResponse} from "../../../response/transaction/init/VoluntaryTransactionInitResponse";

export class VoluntaryTransactionInitResponseBuilder {

    static get(json: JSON): VoluntaryTransactionInitResponse {
        return new VoluntaryTransactionInitResponse();
    }

}
