import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { GameDto } from '../../models/dto/game.dto';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/dto/Review.modal';
import { ReviewComponent } from '../../components/review/review/review.component';
import { MatCard } from '@angular/material/card';
import { AddReviewDto } from '../../models/dto/AddReview.dto';

@Component({
  selector: 'app-game-detail',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    TranslateModule,
    MatSpinner,
    ReviewComponent,
    MatCard

  ],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit {

  reviewAddable: boolean = false
  userId = 0
  isAdmin = false;
  isSavingNewReview = false;
  isSaving: Boolean = false;
  private _snackBar = inject(MatSnackBar);
  game: GameDto = {
    id: 0,
    name: "",
    description: ""
  }
  reviews: Review[] = []

  gameForm = new FormGroup({
    name: new FormControl<String>('', [
      Validators.required
    ]),
    description: new FormControl<String>('', [
      Validators.required
    ])
  })

  addReviewForm = new FormControl<String>('', [Validators.required])

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private location: Location,
    private reviewService: ReviewService) { }



  ngOnInit(): void {
    let gameId: number = 0
    this.route.params.subscribe(param => {
      gameId = param['id']
    })


    this.reviewService.reviewsSubject.subscribe(reviews => {
      this.reviews = reviews;
      console.log('reviews i s' + JSON.stringify(reviews))
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

    this.reviewService.getReviewByGame(gameId).subscribe({
      next: (v) => {
        // this.reviews = v
        this.reviewService.reviewsSubject.next(v);


        this.reviewAddable = this.canAddReview()
        console.log('after reviewing get the boolenai s ' + this.reviewAddable)


      },
      error: (e) => {
      },
      complete: () => {
      }
    })

    console.log('after loading in isreviewaddable ' + this.reviewAddable)

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
        console.log('error at game-detail page' + JSON.stringify(e))
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
    this.userId = this.authService.loggedInUserInformation.id

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

  canAddReview(): boolean {
    let newList = this.reviews.filter(review => review.userId === this.userId)

    console.log('newlsit ' + JSON.stringify(newList))
    if (newList.length === 0) {
      return true
    }

    console.log('returning true')

    return false
  }

  addReviewToList() {
    //todo find out why 
    let newReview = {
      userId: this.userId,
      gameId: this.game.id,
      description: "",
      postedDate: new Date()
    }

    // this.reviewService.reviewsSubject.next(this.reviewService.reviewsSubject.val)
  }


  addReview() {

    if (this.addReviewForm.valid && this.addReviewForm.value !== "") {
      this.isSavingNewReview = true;

      let reviewDto: AddReviewDto = {
        userId: this.userId,
        gameId: this.game.id,
        description: this.addReviewForm.value ?? '',
        postedDate: new Date,
      }


      this.reviewService.addReview(reviewDto).subscribe({
        next: (v) => {

          const currentReviews = this.reviewService.reviewsSubject.value;
          this.reviewService.reviewsSubject.next([...currentReviews, v]);


          this.openSaveSuccesSnackbar()
        },
        error: (e) => {
          console.log('Error at adding a new review  ' + console.log(e))

        },
        complete: () => {
          this.isSavingNewReview = false;

        }
      })
    }

  }

}
