import {Instance} from "../utils/AbstractInstance";

export interface Chargeable extends Instance{

  getCharge(improvementsSize: number);
  maxCharge();

}
