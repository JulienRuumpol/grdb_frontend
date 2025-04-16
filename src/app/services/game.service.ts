import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameDto } from '../models/dto/game.dto';
import { addGameDto } from '../models/dto/AddGame.Dto';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  private appurl = 'http://localhost:8080/game'

  getGameDetail(gameId: number): Observable<any> {


    return this.http.get(this.appurl + '/' + gameId)
  }

  updateGame(game: GameDto): Observable<GameDto> {
    return this.http.put<GameDto>(this.appurl + "/", game)
  }

  addgameToServer(game: addGameDto): Observable<GameDto> {
    return this.http.post<GameDto>(this.appurl + "/", game)
  }

}

