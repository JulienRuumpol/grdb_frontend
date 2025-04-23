import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from '../../../../../services/review.service';
import { Review } from '../../../../../models/dto/Review.modal';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-review-dialog',
  imports: [
    MatDialogContent,
    TranslateModule

  ],
  templateUrl: './delete-review-dialog.component.html',
  styleUrl: './delete-review-dialog.component.css'
})
export class DeleteReviewDialogComponent {
  data = inject(MAT_DIALOG_DATA);

  constructor(private reviewService: ReviewService, private dialogRef: MatDialogRef<DeleteReviewDialogComponent>) {

  }

  deleteReview() {
    const deletedReview: Review = this.data.review
    this.reviewService.deleteReview(deletedReview.id).subscribe({
      next: (v) => {
        this.reviewService.reviewsSubject.next(
          this.reviewService.reviewsSubject.value.filter(review => review.id !== deletedReview.id)
        )
        alert('succes delete')
        this.reviewService.canAddReviewSubject.next(false)
        this.dialogRef.close()

      },
      error: (e) => {
        console.log('error deleting review ' + JSON.stringify(e))

      },
      complete: () => {
      }
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
