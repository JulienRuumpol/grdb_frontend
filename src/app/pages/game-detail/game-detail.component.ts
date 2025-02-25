import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { GameDto } from '../../models/dto/game.dto';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';


@Component({
  selector: 'app-game-detail',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatSpinner
  ],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit {

  isSaving: Boolean = false;
  private _snackBar = inject(MatSnackBar);


  game: GameDto = {
    id: 0,
    name: "",
    description: ""
  }

  gameForm = new FormGroup({
    name: new FormControl<String>('', [
      Validators.required
    ]),
    description: new FormControl<String>('', [
      Validators.required
    ])
  })

  constructor(private gameService: GameService, private route: ActivatedRoute, public snackBar: MatSnackBar) { }



  ngOnInit(): void {
    let gameId: number = 0
    this.route.params.subscribe(param => {
      gameId = param['id']
    })

    console.log('we init for id ' + gameId)

    this.gameService.getGameDetail(gameId).subscribe({
      next: (v) => {
        this.game = v;
        console.log("game " + JSON.stringify(this.game))

        this.gameForm.controls.name.setValue(this.game.name)
        this.gameForm.controls.description.setValue(this.game.description)

      },
      error: (e) => {
        console.log('error at ' + JSON.stringify(e))
        console.log('error ' + e)
      },
      complete: () => {
      }
    })
  }

  saveGame() {
    let newGame = {
      id: this.game.id,
      name: this.gameForm.controls.name.value || "",
      description: this.gameForm.controls.description.value || ""
    }
    this.setIsSaving(true)




    console.log('data of the new game is ' + JSON.stringify(this.game))
    console.log('newgame ' + JSON.stringify(newGame))
    this.gameService.updateGame(newGame).subscribe({
      next: (v) => {
        this.game = v
        this.setIsSaving(false)
        this.openSaveSuccesSnackbar()
      },
      error: (e) => {
        console.log('error at ' + JSON.stringify(e))
      },
      complete: () => {
        this.setIsSaving(false)

      }
    })
  }


  openSaveSuccesSnackbar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000
    })
  }

  setIsSaving(value: Boolean) {
    this.isSaving = value
  }
}
