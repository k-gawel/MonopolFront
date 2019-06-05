import {CookieService} from "ngx-cookie-service";
import {Injectable} from '@angular/core';
import {Player} from "../../../_model/instance/Player";
import {WebSocketService} from "../web-socket/web-socket.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookieService: CookieService) { }

  public $session: BehaviorSubject<Session> = new BehaviorSubject(null);

  getGameUuid(): string {
    return this.getPart(0);
  }

  getPlayerUUID(): string {
    return this.getPart(1);
  }

  getPlayerSession(): string {
    return this.getPart(2);
  }

  setGameSession(session: string ) {
    if(session.split("|").length !== 3)
      throw new Error("Wrong session. SessionService token needs to contain 2 sperarators ' | '.");
    else {
      this.cookieService.set("session-token", session);
      this.$session.next(new Session(session));
    }
  }

  getSession(): string {
    return this.cookieService.get("session-token");
  }

  isAdmin(): boolean {
    try {
      return this.getPlayer().equals(this.getAdmin());
    } catch (e) {
      console.warn(e);
      return false;
    }
  }

  getPlayer(): Player {
    return Player.get(this.getPlayerUUID());
  }

  getAdmin(): Player {
    try {
      return Player.ALL.toArray()[1];
    } catch (e) {
      return null;
    }
  }

  private getPart(part: number): string {
    try {
      return this.getComponents()[part];
    } catch (e) {
      return null;
    }
  }

  private getComponents(): string[] {
    let session = this.getSession();
    let components: string[] = session.split("|");
    if(components.length !== 3)
      return null;

    return components;
  }

}

export class Session {

  public gameUuid: string;
  public playerUuid: string;
  public playerSession: string;
  public session: string;

  constructor(sessionString: string) {
    this.session = sessionString;
    this.gameUuid = this.getPart(0);
    this.playerUuid = this.getPart(1);
    this.playerSession = this.getPart(2);
  }


  private getPart(part: number): string {
    try {
      return this.getComponents()[part];
    } catch (e) {
      return null;
    }
  }

  private getComponents(): string[] {
    let components: string[] = this.session.split("|");
    if(components.length !== 3)
      return null;

    return components;
  }

}
