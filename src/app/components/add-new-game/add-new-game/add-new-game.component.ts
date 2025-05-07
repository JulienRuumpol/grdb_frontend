import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GameService } from '../../../services/game.service';
import { GameDto } from '../../../models/dto/game.dto';
import { addGameDto } from '../../../models/dto/AddGame.Dto';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-add-new-game',
  imports: [
    TranslateModule,
    MatDialogContent,
    MatIcon,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatButton
  ],
  templateUrl: './add-new-game.component.html',
  styleUrl: './add-new-game.component.css'
})
export class AddNewGameComponent {

  gameFormGroup: FormGroup = new FormGroup({
    name: new FormControl<String>('', [
      Validators.required
    ]
    ),
    description: new FormControl<String>('', [
      Validators.required
    ])

  })

  constructor(private dialogRef: MatDialogRef<AddNewGameComponent>, private gameService: GameService) { }


  addNewGameToGamesList() {

    if (this.gameFormGroup.valid && this.gameFormGroup.controls['name'].value !== ""
      && this.gameFormGroup.controls['description'].value !== null) {

      const newGame: addGameDto = {
        name: this.gameFormGroup.controls['name'].value,
        description: this.gameFormGroup.controls['description'].value,
        imageRef: "assets/img/wip.jpg"
      }
      this.gameService.addgameToServer(newGame).subscribe({
        next: (v) => {

          //todo add success notifcation / toast
          alert('saving new game succesful')

          this.closeDialog()
        },
        error: (e) => {

        },
        complete: () => {
        }
      })
    }

  }



  closeDialog() {
    this.dialogRef.close(true)
  }
}
