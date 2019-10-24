import {Player} from "../Player";

export class Tour {

  public player: Player;
  public index: number;
  public endTime: Date;
  public dice_rolled: boolean;
  public rolled: number;

  public constructor() {}

  static get(json: JSON): Tour {
    try {
      let result: Tour = new Tour();
      result.player = Player.get(json['player']);
      result.endTime = new Date(json['end_date']);
      result.index = json['index'];
      result.dice_rolled = json['dice_rolled'];
      return result;
    } catch (e) {
      return null;
    }
  }

  static instanceOf(o: any): boolean {
    if(o == null) return false;

    let t: Tour = <Tour> o;

    return t.player !== undefined && t.index !== undefined && t.endTime !== undefined;
  }

}
