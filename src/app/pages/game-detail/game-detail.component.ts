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
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';


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

  isAdmin = false;
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

  constructor(private gameService: GameService, private route: ActivatedRoute, public snackBar: MatSnackBar, private authService: AuthService, private location: Location) { }



  ngOnInit(): void {
    let gameId: number = 0
    this.route.params.subscribe(param => {
      gameId = param['id']
    })

    this.checkIsUserAdmin()

    this.gameService.getGameDetail(gameId).subscribe({
      next: (v) => {
        this.game = v;

        this.gameForm.controls.name.setValue(this.game.name)
        this.gameForm.controls.description.setValue(this.game.description)

      },
      error: (e) => {
        console.log('error at game detail ' + JSON.stringify(e))
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

  checkIsUserAdmin() {
    this.authService.refreshLoggedInUserInformation()
    let userRole = this.authService.loggedInUserInformation.role

    console.log('user role is ' + userRole)

    if (userRole == 'Admin') {
      this.isAdmin = true
    } else {
      this.isAdmin = false
      this.gameForm.controls.name.disable()
      this.gameForm.controls.description.disable()
    }
  }

  returnToPreviousPage() {
    this.location.back()
  }
}
