import { Component, inject, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardImage } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { GameDto } from '../../models/dto/game.dto';
import { Router } from '@angular/router';
import { AddGameComponent } from '../../components/add-game/add-game.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-home-page',
  imports: [
    MatCard,
    MatCardImage,

  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  games: Array<GameDto> = []
  dialog = inject(MatDialog);



  constructor(private userService: UserService, private _router: Router) { }
  ngOnInit(): void {

    this.userService.getGamesByUserId(2).subscribe({
      next: (v) => {
        this.games = v;
      },
      error: (e) => {
        console.log('error at ' + JSON.stringify(e))
      },
      complete: () => {
      }
    })
  }

  onGameClick(gameId: Number) {
    alert('NYI navigating to game detail page ' + gameId)
    // this._router.navigate(["gameDetail/{gameId}"])
  }

  openAddGameDialog() {
    console.log('hi')
    this.dialog.open(AddGameComponent)
  }


}
