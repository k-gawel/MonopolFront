import {TransactionItemResponse} from "./TransactionItemResponse";
import {Transferable} from "../../../../../instance/interfaces/Transferable";

export class TransactionAddResponse extends TransactionItemResponse {

    public transferable: Transferable;

    public constructor() {
        super("offer");
    }

    static instanceOf(o: any): boolean {
      if(o === undefined) return false;

      let r: TransactionAddResponse = <TransactionAddResponse> o;

      return super.instanceOf(r)
          && r.transferable !== undefined
          && r.transaction_item_action === "offer";
    }

}
