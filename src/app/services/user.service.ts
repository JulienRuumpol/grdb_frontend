import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GameDto } from '../models/dto/game.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private appurl = 'http://localhost:8080/user'

  constructor(private http: HttpClient) { }

  getGamesByUserId(userId: number): Observable<GameDto[]> {
    return this.http.get(this.appurl + "/" + userId + "/game").pipe(
      map((response: any) => response.map((game: GameDto) => ({
        id: game.id,
        name: game.name,
        description: game.description
      })))
    )
  }

  getNonListedGamesByUser(userId: number): Observable<GameDto[]> {
    return this.http.get(this.appurl + "/" + userId + "/game/unique").pipe(
      map((response: any) => response.map((game: GameDto) => ({
        id: game.id,
        name: game.name,
        description: game.description
      })))
    )
  }

  addGameToUser(userId: number, gameId: number): Observable<any> {

    let emptybody = {
      id: "",
      name: "",
      description: ""
    }
    return this.http.post(this.appurl + "/" + userId + "/game/" + gameId, emptybody)

  }
}
