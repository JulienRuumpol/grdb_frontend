import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { GameDto } from '../../models/dto/game.dto';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-game',
  imports: [
    MatDialogContent,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatIcon

  ],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.css'
})
export class AddGameComponent implements OnInit, AfterViewInit {

  games: GameDto[] = []

  constructor(private userService: UserService, private dialogRef: MatDialogRef<AddGameComponent>) { }

  /** control for the selected bank */
  public gameCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public gameFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredGames: ReplaySubject<GameDto[]> = new ReplaySubject<GameDto[]>(1);

  protected _onDestroy = new Subject<void>();

  ngOnInit(): void {

    this.userService.getNonListedGamesByUser(2).subscribe({
      next: (v) => {
        this.games = v;
      },
      error: (e) => {
        console.log('error at ' + JSON.stringify(e))
      },
      complete: () => {
      }
    })

    this.filteredGames.next(this.games.slice());
    this.gameFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  @ViewChild('singleSelect')
  singleSelect!: MatSelect;

  protected setInitialValue() {
    this.filteredGames
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredGames are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: GameDto, b: GameDto) => a && b && a.id === b.id;
      });
  }

  protected filterBanks() {
    if (!this.games) {
      return;
    }
    // get the search keyword
    let search = this.gameFilterCtrl.value;
    if (!search) {
      this.filteredGames.next(this.games.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredGames.next(
      this.games.filter(game => game.name.toLowerCase().indexOf(search) > -1)
    );
  }

  addGameToUser() {
    this.userService.addGameToUser(2, this.gameCtrl.value.id).subscribe({
      next: (v) => {
        this.dialogRef.close(true)
      },
      error: (e) => {
      },
      complete: () => {
      }
    });
  }

  closeDialog() {
    this.dialogRef.close(true)
  }
}
