import {Money} from "../../../../instance/properties/transferable/Money";
import {TransactionResultResponse} from "../../../response/transaction/result/TransactionResultResponse";

export class TransactionResultResponseBuilder {

    static get(json: JSON): TransactionResultResponse {
        let result: TransactionResultResponse = new TransactionResultResponse();

        result.initiator = json['initiator'];
        result.invited   = json['invited'];

        result.initiatorMoney = new Money(json['initiator_money']);
        result.invitedMoney   = new Money(json['invited_money']);

        result.initiatorOffer = <string[]> json['initiator_offer'];
        result.invitedOffer   = <string[]> json['invited_offer'];

        return result;
    }

}
