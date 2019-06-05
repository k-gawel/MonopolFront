export class GameLink {
    index: number;
    uuid: string;
    players: string[];


    constructor(json: JSON) {
        this.uuid    = json['uuid'];
        this.index   = json['index'];
        this.players = json['players'];
    }
}
