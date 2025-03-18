import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { GameDto } from '../models/dto/game.dto';
import { User } from '../models/user.model';
import { ChangePassword } from '../models/changePassword.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private appurl = 'http://localhost:8080/user'
  authenticatedSubjectDetails = new BehaviorSubject<any>("");

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<User[]> {
    // return this.http.get(this.appurl + '/').subscribe((response => {
    //   console.log('response is ' + JSON.stringify(response))
    //   return response

    // }));

    return this.http.get(this.appurl + '/').pipe(
      map((response: any) =>
        response.map((user: User) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }))
      )
    );
  }


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

  getCurrentAuthenticatedUserInformation(email: String) {
    return this.http.get(this.appurl + "/" + email).subscribe({
      next: (v) => {
        this.authenticatedSubjectDetails.next(v)
      },
      error: (e) => {
      },
      complete: () => {
      }
    })
  }

  changeUserPassword(userId: number, passwordInfo: ChangePassword): Observable<any> {
    return this.http.put(this.appurl + '/' + userId + '/password', passwordInfo)
  }
}
