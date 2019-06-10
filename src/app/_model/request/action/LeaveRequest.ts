import {GameActionRequest} from "./GameActionRequest";

export class LeaveRequest extends GameActionRequest {

  public constructor() {
    super("leave");
  }

}
