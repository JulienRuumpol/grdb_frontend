import { Component, inject, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardImage } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { GameDto } from '../../models/dto/game.dto';
import { Router } from '@angular/router';
import { AddGameComponent } from '../../components/add-game/add-game.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { AddNewGameComponent } from '../../components/add-new-game/add-new-game/add-new-game.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-home-page',
  imports: [
    MatCard,
    MatCardImage,
    TranslateModule,
    MatIcon,
    MatButton
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  games: Array<GameDto> = []
  dialog = inject(MatDialog);
  isAdmin: boolean = false;



  constructor(private userService: UserService, private _router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.getUserGameData()
    this.isAdmin = this.authService.isAdmin()
  }

  onGameClick(gameId: Number) {
    this._router.navigate(["game/" + gameId])
  }

  openAddGameDialog() {
    this.dialog.open(AddGameComponent)

    this.dialog.afterAllClosed.subscribe((result: any) => {
      this.getUserGameData()
    })
  }

  getUserGameData() {

    let userId = this.authService.getStoredUserInformation().id

    this.userService.getGamesByUserId(userId).subscribe({
      next: (v) => {
        this.games = v;

      },
      error: (e) => {
        console.log('error home page at ' + JSON.stringify(e))
      },
      complete: () => {
      }
    })
  }

  openAddNewgameDialog() {
    this.dialog.open(AddNewGameComponent)

  }
}
