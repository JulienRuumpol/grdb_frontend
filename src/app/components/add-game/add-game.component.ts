import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-game',
  imports: [
    MatDialogContent,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule

  ],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.css'
})
export class AddGameComponent {
  foods: any[] = [
    { value: 'Sea of thieves', viewValue: 'Sea of thieves' },
    { value: 'Guild wars 2', viewValue: 'Guild wars 2' },
    { value: 'Final fantasy', viewValue: 'Final fantasy' },
  ];

  gameSelectCtrl = new FormControl();
  gameSearchCtrl = new FormControl();

  public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  protected _onDestroy = new Subject<void>();

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  @ViewChild('singleSelect') singleSelect: MatSelect;

  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  addGameToUser() {
    alert("Feature Not yet implemented")
  }

}
