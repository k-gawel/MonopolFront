import {Transferable} from "../../interfaces/Transferable";
import {Town} from "./Town";
import {Utility} from "./Utility";
import {Discount} from "./Discount";
import {Improvement} from "./Improvement";
import {Money} from "./Money";

export class TransferableBuilder {

    static get(json: JSON): Transferable {
        let type = json['transferable_type'];

        switch (type) {
            case "town":
                return Town.get(json);
            case "utility":
                return Utility.get(json);
            case "discount":
                return Discount.get(json);
            case "improvement":
                return Improvement.get(json);
            case "money":
                return Money.get(json);
            default:
                throw new Error("Wrong transferable type " + json);
        }

    }
}
