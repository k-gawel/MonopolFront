import {AbstractInstance} from "../../utils/AbstractInstance";
import {Transferable} from "../../interfaces/Transferable";
import {Player} from "../../Player";
import {Money} from "./Money";

export abstract class AbstractTransferable extends AbstractInstance  {

    private canBeAdd: boolean | null = null;
    private canBeRemoved: boolean | null = null;


    addProperty(): boolean | null {
        return this.canBeAdd;
    }

    removeProperty(): boolean | null {
        return this.canBeRemoved;
    }

    setAddProperty(value: boolean | null) {
        this.canBeAdd = value;
    }

    setRemoveProperty(value: boolean | null) {
        this.canBeRemoved = value;
    }


}
