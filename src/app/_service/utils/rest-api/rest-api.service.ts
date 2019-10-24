import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

console.log("REST URL: ",  "http://" +  window.location.hostname + ":8080/monopol-server-0.0.2/");

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private url: string = "http://" + window.location.hostname + ":8080/monopol-server-0.0.2/";

  constructor(private http: HttpClient) { }


  public getList(): Promise<JSON[]> {
    let url = this.url + "games-list";

    console.log("GET LIST URL" + url);

    return this.http.get<JSON[]>(url).toPromise();
  }


  public createNewGame(playerName: string): Promise<JSON> {
    let url = this.url + "game/new";

    let params = new HttpParams();
    params = params.append("player_name", playerName);


    return this.http.post<JSON>(url, null, {params: params}).toPromise();
  }


  public joinGame(uuid: string, playerName: string): Promise<JSON> {
    let url = this.url + "game/join";
    let params = new HttpParams();
    params = params.append("game_uuid", uuid);
    params = params.append("player_name", playerName);

    return this.http.post<JSON>(url, null, {params: params}).toPromise();
  }


  public getGame(session: string): Promise<JSON> {
    let url = this.url.concat("game/get");
    let params = new HttpParams().append("session", session);

    return this.http.get<JSON>(url, {params: params}).toPromise();
  }


}
