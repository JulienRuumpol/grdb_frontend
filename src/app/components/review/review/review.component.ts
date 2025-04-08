import { Component, inject, Input, OnInit } from '@angular/core';
import { Review } from '../../../models/dto/Review.modal';
import { MatCard } from '@angular/material/card';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { ReviewService } from '../../../services/review.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent } from '@angular/material/dialog';
import { DeleteReviewDialogComponent } from './delete_review_confirm_dialog/delete-review-dialog/delete-review-dialog.component';
import { AuthService } from '../../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UpdateReview } from '../../../models/updateReview.modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { MatFormField, MatInput } from '@angular/material/input';

@Component({
  selector: 'app-review',
  imports: [
    MatCard,
    MatTooltip,
    MatIcon,
    MatDialogContent,
    TranslateModule,
    DatePipe,
    ReactiveFormsModule,
    MatInput,
    MatFormField

  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  canUserDeleteReview: boolean = false;
  dialog = inject(MatDialog);
  @Input() userId!: number;
  @Input() isAdmin!: boolean;
  @Input() review!: Review
  private _snackBar = inject(MatSnackBar);


  reviewForm = new FormGroup({
    description: new FormControl<String>('', [
      Validators.required
    ])
  })

  constructor(private reviewService: ReviewService,
    private authService: AuthService,
    public snackBar: MatSnackBar) { }
  ngOnInit(): void {
    console.log('user id ' + this.userId + "review user id " + this.review.userId)

    this.reviewForm.controls.description.setValue(this.review.description)

    if (this.userId !== this.review.userId) {
      this.reviewForm.controls.description.disable()
    }

  }

  openDeleteDialog() {
    console.log('opening stuff')
    this.dialog.open(DeleteReviewDialogComponent, {
      data: {
        review: this.review
      }
    })

  }


  isUserAdminOrIdEqualToReview() {
    let userId = this.authService.loggedInUserInformation.id
    let userRole = this.authService.loggedInUserInformation.role

    console.log("uiser id " + userId + " review userID " + this.review.userId + "uiser role " + userRole)
    if (userId.id === this.review.userId) {
      console.log('review ' + this.review.description + " is true")
      return true;
    } else {
      return false
    }
  }

  saveReview() {
    let newDescription: UpdateReview = {
      newDescription: this.reviewForm.controls.description.value || ""
    }

    if (this.reviewForm.valid) {

      this.reviewService.updateReview(this.review.id, newDescription).subscribe({
        next: (v) => {
          this.review.description = newDescription.newDescription
          this.openSaveSuccesSnackbar()
        },
        error: (e) => {
          console.log('error when updating review ' + this.review.id + " " + JSON.stringify(e))

        },
        complete: () => {
        }
      }
      )
    }

  }

  openSaveSuccesSnackbar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 500000
    })
  }
}

